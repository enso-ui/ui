<template>
    <div v-if="tooltip"
        class="navbar-item"
         v-tooltip="tooltip">
        <a @click="reload">
            <span class="icon has-text-danger animated infinite heartBeat slow delay-5s">
                <fa icon="exclamation-triangle"/>
            </span>
        </a>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

library.add(faExclamationTriangle);

export default {
    name: 'AppUpdate',

    directives: { tooltip: VTooltip },

    inject: ['i18n'],

    data: () => ({
        tooltip: null
    }),

    computed: {
        ...mapState(['meta']),
        ...mapState('layout', ['isTouch']),
        ...mapGetters('websockets', ['appUpdates']),
    },

    created() {
        this.connect();
        this.listen();
    },

    methods: {
        ...mapMutations('websockets', ['connect']),
        listen() {
            window.Echo.private(this.appUpdates)
                .listen('.new-update', ({ title, message, tooltip }) => {
                    this.tooltip = this.i18n(tooltip);

                    this.$toastr.duration(30000)
                        .title(this.i18n(title))
                        .warning(this.i18n(message));
                });
        },

        reload() {
            window.location.reload(true);
        },
    },
};
</script>
