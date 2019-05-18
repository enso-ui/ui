import Echo from 'laravel-echo';

export const state = {
    ioChannel: null,
    privateChannel: null,
    pusher: null,
};

export const mutations = {
    configure: (state, config) => {
        state.ioChannel = config.ioChannel;
        state.privateChannel = config.privateChannel;
        state.pusher = config.pusher;
    },
    connect: (state) => {
        if (!window.Echo) {
            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: state.pusher.key,
                cluster: state.pusher.options.cluster,
                encrypted: state.pusher.options.encrypted,
                namespace: 'App.Events',
            });
        }
    },
}
;