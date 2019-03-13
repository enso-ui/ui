<template>
    <div class="wrapper">
        <uploader :url="path"
            :params="params"
            :file-size-limit="fileSizeLimit"
            file-key="import"
            v-on="$listeners"
            @upload-start="running = true"
            @upload-error="running = false"
            @upload-successful="uploaded"
            ref="uploader">
            <template v-slot:control="{ controlEvents }">
                <a :class="['button is-success', { 'is-loading': running }]"
                    v-on="controlEvents"
                    v-if="!hasErrors">
                    <slot>
                        <span>{{ i18n('Import File') }}</span>
                        <span class="icon is-small">
                            <fa icon="upload"/>
                        </span>
                    </slot>
                </a>
            </template>
        </uploader>
        <modal :show="hasErrors"
            v-on="$listeners"
            portal="import-summary"
            @close="summary = null"
            v-if="hasErrors">
            <div class="box">
                <p class="title is-4 has-text-centered">
                    <fa icon="exclamation-triangle"/>
                    {{ i18n('Structure Errors') }}
                </p>
                <div
                    v-for="(errors, category) in summary.errors"
                    :key="category">
                    <p class="title is-6 has-text-centered is-marginless">
                        {{ category }}:
                    </p>
                    <div class="tags is-centered has-padding-top-large has-padding-bottom-large">
                        <span class="tag is-medium is-bold has-text-danger"
                            v-for="error in errors"
                            :key="error">
                            {{ error }}
                        </span>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Uploader, Modal } from '@enso-ui/bulma';

library.add(faUpload);

export default {
    name: 'ImportUploader',

    components: { Uploader, Modal },

    inject: ['i18n'],

    props: {
        fileSizeLimit: {
            type: Number,
            default: 100000000,
        },
        params: {
            type: Object,
            required: true,
            validator: v => Object.keys(v).includes('type'),
        },
        path: {
            type: String,
            required: true,
        },
    },

    data: () => ({
        running: false,
        summary: null,
    }),

    computed: {
        hasErrors() {
            return !!this.summary
                && !!this.summary.errors
                && Object.keys(this.summary.errors).length > 0;
        },
    },

    methods: {
        uploaded($event) {
            this.summary = $event;
            this.running = false;
            this.$emit('upload-successful');
        },
        browseFiles() {
            this.$refs.uploader.browseFiles();
        },
    },
};
</script>
