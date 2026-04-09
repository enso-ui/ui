<template>
    <navbar-item manual
        :icon="faTriangleExclamation"
        v-if="appUpdate"
        ref="navbarItem">
        <template #default>
            <div class="p-2 has-text-centered enso-app-message">
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
import { app } from '../../../pinia/app';
import { websockets } from '../../../pinia/websockets';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import NavbarItem from './NavbarItem.vue';

export default {
    name: 'AppUpdate',

    components: { NavbarItem },

    inject: ['i18n'],

    data: () => ({
        faTriangleExclamation,
        listenTimer: null,
        listening: false,
        message: 'The application was updated, please refresh your page to load the latest application version',
    }),

    computed: {
        appUpdate() {
            return app().appUpdate;
        },
        channels() {
            return websockets().channels;
        },
    },

    created() {
        this.ensureListener();
    },

    beforeUnmount() {
        clearTimeout(this.listenTimer);
    },

    methods: {
        connect() {
            return websockets().connect(app().meta.csrfToken);
        },
        newRelease() {
            return app().newRelease();
        },
        ensureListener() {
            if (this.listening) {
                return;
            }

            if (!window.Echo || !this.channels?.appUpdates) {
                this.listenTimer = setTimeout(() => this.ensureListener(), 250);
                return;
            }

            this.listening = true;
            this.connect()
                .then(() => this.listen());
        },
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
            this.$nextTick(() => this.$refs.navbarItem?.show());
        },
    },
};
</script>

<style lang="scss">
.enso-app-message {
    width: 300px;
}
</style>
