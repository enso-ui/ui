import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const initEcho = ({ authEndpoint, pusher }, csrfToken) => window
    .Echo = new Echo({
        broadcaster: 'pusher',
        key: pusher.key,
        cluster: pusher.options.cluster,
        useTLS: pusher.options.useTLS,
        namespace: 'App.Events',
        csrfToken: csrfToken,
        authEndpoint: authEndpoint,
    });

export const state = {
    authEndpoint: null,
    channels: null,
    pusher: null,
};

export const getters = {
    channels: state => state.channels,
};

export const mutations = {
    configure: (state, config) => {
        state.channels = config.channels;
        state.pusher = config.pusher;
        state.authEndpoint = config.authEndpoint;
    },
};

export const actions = {
    connect: async ({ state, rootState }) => {
        if (!window.Echo) {
            await initEcho(state, rootState.meta.csrfToken);
        }
    },
};
