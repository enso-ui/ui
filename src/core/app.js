import Resources from './services/resources';

class App {
    constructor() {
        this.store = null;
    }

    boot(store) {
        this.store = store;
        Resources.boot();
    }

    registerNavbarItem(component, order, permission) {
        const item = { component, order, permission };

        this.store.commit('layout/navbar/registerItem', item);
    }

    registerSettingsItem(component, order) {
        const item = { component, order };

        this.store.commit('layout/settings/registerItem', item);
    }
}

export default new App();
