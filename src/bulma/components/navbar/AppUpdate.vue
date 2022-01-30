<template>
    <navbar-item class="enso-app-update"
        manual
        icon="exclamation-triangle"
        v-if="appUpdate"
        ref="navbarItem">
        <template #default>
            <div class="p-2 has-text-centered">
                <p>{{ i18n(message) }}</p>
                <a class="button is-info mt-2"
                    @click="reload">
                    <span>{{ i18n('Reload') }}</span>
                </a>
            </div>
        </template>
    </navbar-item>
</template>

<script>
import {
    mapState, mapActions, mapGetters, mapMutations,
} from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import NavbarItem from './NavbarItem.vue';

library.add(faExclamationTriangle);

export default {
    name: 'AppUpdate',

    components: { NavbarItem },

    inject: ['i18n'],

    data: () => ({
        message: 'The application was updated, please refresh your page to load the latest application version',
    }),

    computed: {
        ...mapState(['appUpdate']),
        ...mapGetters('websockets', ['channels']),
    },

    created() {
        this.connect();
        this.listen();
    },

    methods: {
        ...mapMutations(['newRelease']),
        ...mapActions('websockets', ['connect']),
        listen() {
            window.Echo.private(this.channels.appUpdates)
                .listen('.app-update', this.handle);
        },
        reload() {
            window.location.reload(true);
        },
        handle({ message }) {
            this.newRelease();
            this.message = message;
            this.$nextTick(() => this.$refs.navbarItem.show());
        },
    },
};
</script>

<style lang="scss">
.enso-app-update {
    width: 300px;
}
</style>
