<template>
    <div class="wrapper">
        <div class="columns">
            <div class="column is-3-desktop is-8-tablet is-12-mobile">
                <enso-select v-model="importType"
                    :options="importTypes"
                    placeholder="Import Type"
                    @input="getTemplate"/>
            </div>
            <div class="column is-6 is-hidden-touch has-text-centered"
                v-if="importType">
                <uploader class="animated fadeIn"
                    :url="templateLink"
                    :params="{ type: importType }"
                    file-key="template"
                    @upload-start="loadingTemplate=true"
                    @upload-successful="
                        template = $event;
                        loadingTemplate = false
                    "
                    @upload-error="loadingTemplate = false"
                    v-if="!template">
                    <template v-slot:control="{ controlEvents }">
                        <a class="button is-info"
                            v-on="controlEvents">
                            <span>{{ i18n('Upload Template') }}</span>
                            <span class="icon is-small">
                                <fa icon="upload"/>
                            </span>
                        </a>
                    </template>
                </uploader>
                <a class="button is-info animated fadeIn has-margin-right-small"
                    v-if="template"
                    v-tooltip="template.original_name"
                    :href="downloadLink">
                    <span>{{ i18n('Download Template') }}</span>
                    <span class="icon is-small">
                        <fa icon="download"/>
                    </span>
                </a>
                <a class="button is-danger animated fadeIn"
                    @click="summaryModal = true"
                    v-if="template"
                    :disabled="!canAccess('import.deleteTemplate')">
                    <span>{{ i18n('Delete Template') }}</span>
                    <span class="icon is-small">
                        <fa icon="trash-alt"/>
                    </span>
                </a>
            </div>
            <div class="column has-text-centered-touch has-text-right-desktop"
                v-if="importType">
                <import-uploader class="is-pulled-right"
                    :path="importLink"
                    :params="{ type: importType }"
                    @upload-successful="$refs.imports.fetch()"/>
            </div>
        </div>
        <vue-table class="box is-paddingless raises-on-hover is-rounded animated fadeIn"
            :path="route('import.initTable')"
            id="imports"
            @download-rejected="downloadRejected"
            ref="imports">
            <b slot="entries"
                slot-scope="{ row }"
                class="has-text-info">
                {{ row.entries || '-' }}
            </b>
            <b slot="successful" slot-scope="{ row }"
                class="has-text-success">
                {{ row.successful === null ? '-' : row.successful }}
            </b>
            <b slot="failed"
                slot-scope="{ row }"
                class="has-text-danger">
                {{ row.failed === null ? '-' : row.failed }}
            </b>
            <span slot="computedStatus"
                slot-scope="{ row }"
                :class="[
                    'tag is-table-tag',
                    {'is-info': row.status === 10},
                    {'is-warning': row.status === 20},
                    {'is-primary': row.status === 23},
                    {'is-danger': row.status === 26},
                    {'is-success': row.status === 30}
                ]">
                {{ row.computedStatus }}
            </span>
        </vue-table>
        <summary :show="summaryModal"
            @close="summaryModal = false"
            :i18n="i18n"
            @commit="deleteTemplate(template.id); summaryModal = false"/>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUpload, faDownload, faTrashAlt, faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import VueTable from '@enso-ui/tables/bulma';
import { EnsoSelect, Uploader } from '@enso-ui/bulma';
import ImportUploader from './components/ImportUploader.vue';
import Summary from './components/Summary.vue';

library.add(faUpload, faDownload, faTrashAlt, faFileExcel);

export default {
    name: 'Index',

    inject: ['canAccess', 'errorHandler', 'i18n'],

    components: {
        EnsoSelect, VueTable, Uploader, ImportUploader, Summary,
    },

    directives: { tooltip: VTooltip },

    data: () => ({
        importType: null,
        summary: {},
        template: null,
        summaryModal: false,
        loadingTemplate: false,
        importTypes: [],
    }),

    computed: {
        templateLink() {
            return this.importType
                && route('import.uploadTemplate');
        },
        downloadLink() {
            return this.template
                && route('import.downloadTemplate', this.template.id);
        },
        importLink() {
            return this.importType
                && route('import.store');
        },
        hasErrors() {
            return this.summary
                && this.summary.errors
                && Object.keys(this.summary.errors).length;
        },
    },

    created() {
        axios.get(route('import.index'))
            .then(({ data }) => {
                this.importTypes = data.importTypes;
            }).catch(this.errorHandler);
    },

    methods: {
        getTemplate() {
            if (!this.importType) {
                return;
            }

            this.loadingTemplate = true;

            axios.get(route('import.template', this.importType))
                .then(({ data }) => {
                    this.template = data;
                    this.loadingTemplate = false;
                }).catch((error) => {
                    this.loadingTemplate = false;
                    this.errorHandler(error);
                });
        },
        deleteTemplate(id) {
            this.loadingTemplate = true;
            axios.delete(route('import.deleteTemplate', id))
                .then(({ data }) => {
                    this.template = null;
                    this.summaryModal = false;
                    this.$toastr.success(data.message);
                    this.loadingTemplate = false;
                }).catch((error) => {
                    this.summaryModal = false;
                    this.loadingTemplate = false;
                    this.errorHandler(error);
                });
        },
        downloadRejected({ rejectedId }) {
            if (!rejectedId) {
                this.$toastr.info(this.i18n('No rejected summary available'));
                return;
            }

            window.location.href = route('import.downloadRejected', rejectedId);
        },
    },
};
</script>
