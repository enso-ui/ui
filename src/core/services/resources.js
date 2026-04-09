import contexts from './contexts';

class Resources {
    constructor() {
        this.profile = 'bulma';
        this.contexts = contexts;
    }

    boot(app) {
        this.requireContext(this.register(), app)
            .requireContext(this.icons());
    }

    coreRoutes() {
        return this.resolve(this.contexts[this.profile].coreRoutes);
    }

    icons() {
        return this.resolve(this.contexts[this.profile].icons);
    }

    register() {
        return this.resolve(this.contexts[this.profile].register);
    }

    routes() {
        return this.resolve(this.contexts[this.profile].routes);
    }

    localRoutes() {
        return this.resolve(this.contexts.local.routes);
    }

    requireContext(requireContext, app = null) {
        requireContext.keys().forEach(file => {
            const module = requireContext(file);
            const register = module?.default ?? module;

            if (app && typeof register === 'function') {
                register(app);
            }
        });

        return this;
    }

    resolve(contextOrFactory) {
        return typeof contextOrFactory === 'function'
            ? contextOrFactory()
            : contextOrFactory;
    }
};

export default new Resources();
