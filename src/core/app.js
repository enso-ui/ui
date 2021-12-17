import Resources from './services/resources';

class App {
    constructor() {
        this.app = null;
        this.store = null;
    }

    boot(app, store) {
        this.app = app;
        this.store = store;
        Resources.boot();
    }

    registerNavbarItem(key, component, order, permission) {
        this.app.component(key, component);

        const item = { key, component, order, permission };

        this.store.commit('layout/navbar/registerItem', item);
    }

    registerSettingsItem(key, component, order) {
        this.app.component(key, component);

        const item = { key, component, order };

        this.store.commit('layout/settings/registerItem', item);
    }
}

export default new App();
