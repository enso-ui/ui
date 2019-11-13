<template>
    <div v-if="visible"
        class="navbar-item is-active"
        v-tooltip="message">
        <a @click="reload">
            <span class="icon animated infinite heartBeat slow delay-5s">
                <fa icon="sync"/>
            </span>
        </a>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { mapState, mapMutations, mapGetters } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSync } from '@fortawesome/free-solid-svg-icons';

library.add(faSync);

export default {
    name: 'AppUpdate',

    directives: { tooltip: VTooltip },

    inject: ['i18n'],

    data: () => ({
        visible: false,
        message: ''
    }),

    computed: {
        ...mapState(['user', 'meta']),
        ...mapGetters('websockets', ['applicationUpdates']),
        ...mapState('layout', ['isTouch']),
    },

    created() {
        this.connect();
        this.listen();
    },

    methods: {
        ...mapMutations('websockets', ['connect']),
        listen() {
            window.Echo.private(this.applicationUpdates)
                .listen('.updated', ({ message }) => {
                    this.message = this.i18n(message);
                    this.$toastr.warning(this.message);
                    this.visible = true;
                });
        },

        reload() {
            window.location.reload(true)
        },
    },
};
</script>
