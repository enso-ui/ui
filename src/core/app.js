import Resources from './services/resources';

class App {
    constructor() {
        this.vm = null;
    }

    boot(vm) {
        this.vm = vm;

        Resources.boot();
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
