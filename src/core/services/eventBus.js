const listeners = new Map();

const callbacksFor = event => listeners.get(event) ?? [];

const eventBus = {
    $on(event, callback) {
        listeners.set(event, [...callbacksFor(event), callback]);

        return eventBus;
    },

    $once(event, callback) {
        const listener = (...args) => {
            eventBus.$off(event, listener);
            callback(...args);
        };

        listener.callback = callback;

        return eventBus.$on(event, listener);
    },

    $off(event, callback) {
        if (!callback) {
            listeners.delete(event);

            return eventBus;
        }

        const nextCallbacks = callbacksFor(event)
            .filter(listener => listener !== callback && listener.callback !== callback);

        if (nextCallbacks.length) {
            listeners.set(event, nextCallbacks);
        } else {
            listeners.delete(event);
        }

        return eventBus;
    },

    $emit(event, ...args) {
        callbacksFor(event).slice()
            .forEach(callback => callback(...args));

        return eventBus;
    },
};

export default eventBus;
