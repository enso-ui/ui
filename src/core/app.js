import Resources from './services/resources';

class App {
    constructor() {
        this.instance = null;
        this.store = null;
        this.router = null;
        this.navbarItems = [];
        this.settingsItems = [];
    }

    boot(app, store, router) {
        this.instance = app;
        this.store = store;
        this.router = router;
        Resources.boot();
    }

    registerNavbarItem(key, component, order, permission = null) {
        const item = { key, component, order, permission };
        this.navbarItems.push(item);
    }

    registerSettingsItem(key, component, order, permission = null) {
        const item = { key, component, order, permission };
        this.settingsItems.push(item);
    }
}

export default new App();
