import Echo from 'laravel-echo';

export const state = {
    channels: {
        ioChannel: null,
        privateChannel: null,
        applicationUpdates: null,
    },
    pusher: null,
};

export const getters = {
    ioChannel: state => state.channels.ioChannel,
    privateChannel: state => state.channels.privateChannel,
    applicationUpdates: state => state.channels.applicationUpdates,
};

export const mutations = {
    configure: (state, config) => {
        state.channels = config.channels;
        state.pusher = config.pusher;
    },
    connect: (state) => {
        if (!window.Echo) {
            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: state.pusher.key,
                cluster: state.pusher.options.cluster,
                useTLS: state.pusher.options.useTLS,
                namespace: 'App.Events',
            });
        }
    },
};

