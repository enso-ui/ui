import Resources from './services/resources';

class App {
    constructor() {
        this.instance = null;
        this.store = null;
        this.router = null;
    }

    boot(app, store, router) {
        this.instance = app;
        this.store = store;
        this.router = router;
        Resources.boot();
    }

    registerNavbarItem(key, component, order, permission) {
        this.instance.component(key, component);

        const item = { key, component, order, permission };

        this.store.commit('layout/navbar/registerItem', item);
    }

    registerSettingsItem(key, component, order) {
        this.instance.component(key, component);

        const item = { key, component, order };

        this.store.commit('layout/settings/registerItem', item);
    }
}

export default new App();
