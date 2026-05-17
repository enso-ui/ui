import 'animate.css';
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
        Resources.boot(this);
    }

    registerNavbarItem(key, component, order, permission = null) {
        if (!this.navbarItems.some(item => item.key === key)) {
            this.navbarItems.push({ key, component, order, permission });
        }
    }

    registerSettingsItem(key, component, order, permission = null) {
        if (!this.settingsItems.some(item => item.key === key)) {
            this.settingsItems.push({ key, component, order, permission });
        }
    }
}

export default new App();
