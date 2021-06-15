import contexts from './contexts';

class Resources {
    constructor() {
        this.profile = process.env.VUE_APP_PROFILE;
        this.contexts = contexts;
    }

    boot() {
        this.requireContext(this.register())
            .requireContext(this.icons());
    }

    coreRoutes() {
        return this.contexts[this.profile].coreRoutes;
    }

    icons() {
        return this.contexts[this.profile].icons;
    }

    register() {
        return this.contexts[this.profile].register;
    }

    routes() {
        return this.contexts[this.profile].routes;
    }

    localRoutes() {
        return this.contexts.local.routes;
    }

    store() {
        return this.contexts.common.store;
    }

    localStore() {
        return this.contexts.local.store;
    }

    requireContext(requireContext) {
        requireContext.keys().forEach(file => requireContext(file));

        return this;
    }
};

export default new Resources();
