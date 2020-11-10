import contexts from './resourceContexts';

class Resources {
    constructor() {
        this.profile = process.env.VUE_APP_PROFILE;
    }

    boot() {
        this.requireContext(this.register())
            .requireContext(this.icons());
    }

    coreRoutes() {
        return contexts[this.profile].coreRoutes;
    }

    icons() {
        return contexts[this.profile].icons;
    }

    register() {
        return contexts[this.profile].register;
    }

    routes() {
        return contexts[this.profile].routes;
    }

    localRoutes() {
        return contexts.local.routes;
    }

    store() {
        return contexts.common.store;
    }

    localStore() {
        return contexts.local.store;
    }

    requireContext(requireContext) {
        requireContext.keys().forEach(file => requireContext(file));

        return this;
    }

};

export default new Resources();
