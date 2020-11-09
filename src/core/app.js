import RouteBuilder from './services/RouteBuilder';
import StoreBuilder from './services/StoreBuilder';

import paths from './paths';

class App {
    constructor() {
        this.vm = null;
        this.profile = null;
        this.paths = paths;
        this.routes = null;
    }

    bulma() {
        this.profile = 'bulma';

        return this;
    }

    boot(vm) {
        this.vm = vm;

        this.requireContext(this.path('register'))
            .requireContext(this.path('icons'));
    }

    buildRoutes(localRoutes) {
        return new RouteBuilder(localRoutes, this.profile).get();
    }

    buildStore(localStore) {
        return new StoreBuilder(localStore).get();
    }

    requireContext(requireContext) {
        requireContext.keys().forEach(file => requireContext(file));

        return this;
    }

    path(resource) {
        return this.paths[this.profile][resource];
    }

    registerNavbarItem(component, order) {
        const item = { component, order };

        this.vm.$store.commit('layout/navbar/registerItem', item);
    }

    registerSettingsItem(component, order) {
        const item = { component, order };

        this.vm.$store.commit('layout/settings/registerItem', item);
    }
}

export default new App();
