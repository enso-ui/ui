<template>
    <div class="wrapper">
        <div class="columns">
            <div class="column is-3-desktop is-8-tablet is-12-mobile">
                <enso-select v-model="type"
                    :options="types"
                    placeholder="Import Type"
                    @input="getTemplate"/>
            </div>
            <div class="column is-6 is-hidden-touch has-text-centered"
                v-if="type">
                <uploader class="animated fadeIn"
                    :url="templateLink"
                    :params="params"
                    file-key="template"
                    @upload-start="loadingTemplate=true"
                    @upload-error="loadingTemplate = false"
                    @upload-successful="
                        template = $event;
                        loadingTemplate = false
                    "
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
                v-if="type">
                <import-uploader class="is-pulled-right"
                    :path="importLink"
                    :params="params"
                    @upload-successful="$refs.imports.fetch()"/>
            </div>
        </div>
        <enso-table class="box is-paddingless raises-on-hover"
            id="dataImports"
            :filters="filters"
            @download-rejected="downloadRejected"
            ref="imports">
            <template v-slot:entries="{ row }">
                <strong class="has-text-info">
                    {{ row.entries || '-' }}
                </strong>
            </template>
            <template v-slot:successful="{ row }">
                <strong class="has-text-success">
                    {{ row.successful === null ? '-' : row.successful }}
                </strong>
            </template>
            <template v-slot:failed="{ row }">
                <strong class="has-text-danger">
                    {{ row.failed === null ? '-' : row.failed }}
                </strong>
            </template>
            <template v-slot:computedStatus="{ row }">
                <span :class="[
                        'tag is-table-tag',
                        {'is-info': row.status === 10},
                        {'is-warning': row.status === 20},
                        {'is-primary': row.status === 23},
                        {'is-danger': row.status === 26},
                        {'is-success': row.status === 30}
                    ]">
                    {{ row.computedStatus }}
                </span>
            </template>
        </enso-table>
        <template-modal :show="summaryModal"
            @close="summaryModal = false"
            @commit="deleteTemplate(template.id); summaryModal = false"/>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faUpload, faDownload, faTrashAlt, faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import { EnsoTable } from '@enso-ui/tables/bulma';
import { EnsoSelect, Uploader } from '@enso-ui/bulma';
import ImportUploader from './components/ImportUploader.vue';
import TemplateModal from './components/TemplateModal.vue';

library.add(faUpload, faDownload, faTrashAlt, faFileExcel);

export default {
    name: 'Index',

    inject: ['canAccess', 'errorHandler', 'i18n', 'route'],

    components: {
        EnsoSelect, EnsoTable, Uploader, ImportUploader, TemplateModal,
    },

    directives: { tooltip: VTooltip },

    data: () => ({
        type: null,
        summary: {},
        template: null,
        summaryModal: false,
        loadingTemplate: false,
        types: [],
    }),

    computed: {
        params() {
            return { type: this.type };
        },
        filters() {
            return {
                data_imports: { type: this.type },
            };
        },
        templateLink() {
            return this.canAccess('import.uploadTemplate')
                && this.type
                && this.route('import.uploadTemplate');
        },
        downloadLink() {
            return this.canAccess('import.downloadTemplate')
                && this.template
                && this.route('import.downloadTemplate', this.template.id);
        },
        importLink() {
            return this.canAccess('import.store')
                && this.type
                && this.route('import.store');
        },
        hasErrors() {
            return this.summary
                && this.summary.errors
                && Object.keys(this.summary.errors).length;
        },
    },

    created() {
        axios.get(this.route('import.index'))
            .then(({ data }) => {
                this.types = data.types;
            }).catch(this.errorHandler);
    },

    methods: {
        getTemplate() {
            if (!this.type) {
                return;
            }

            this.loadingTemplate = true;

            axios.get(this.route('import.template', this.type))
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
            axios.delete(this.route('import.deleteTemplate', id))
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

            window.location.href = this.route('import.downloadRejected', rejectedId);
        },
    },
};
</script>
