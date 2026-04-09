import Echo from 'laravel-echo';
import { defineStore } from 'pinia';

const resolvePusher = async () => {
    const module = await import('pusher-js');
    const Pusher = module.default ?? module;

    window.Pusher = Pusher;

    return Pusher;
};

const initEcho = async ({ authEndpoint, pusher }, csrfToken) => {
    await resolvePusher();

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: pusher.key,
        cluster: pusher.options.cluster,
        useTLS: pusher.options.useTLS,
        namespace: 'App.Events',
        csrfToken,
        authEndpoint,
    });

    return window.Echo;
};

export const websockets = defineStore('websockets', {
    state: () => ({
        authEndpoint: null,
        channels: null,
        pusher: null,
    }),

    actions: {
        set(config) {
            this.channels = config.channels;
            this.pusher = config.pusher;
            this.authEndpoint = config.authEndpoint;
        },
        async connect(csrfToken) {
            if (!window.Echo && this.authEndpoint && this.pusher) {
                await initEcho(this, csrfToken);
            }
        },
    },
});
