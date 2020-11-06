/* eslint-disable class-methods-use-this */
import routeImporter from '../modules/importers/routeImporter';
import RouteMerger from '../modules/importers/RouteMerger';

class App {
    constructor() {
        this.vm = null;
    }

    boot(vm, layout) {
        this.vm = vm;

        this.includeRegisters(layout)
            .includeIcons(layout);
    }

    getRoutes(layout) {
        return new RouteMerger(routeImporter(App.paths()[layout].coreRoutes))
            .add(routeImporter(App.paths()[layout].routes));
    }

    includeRegisters(layout) {
        this.importAll(App.paths()[layout].registers);

        return this;
    }

    includeIcons(layout) {
        this.importAll(App.paths()[layout].icons);

        return this;
    }

    importAll(requireContext) {
        requireContext.keys().forEach(file => requireContext(file));
    }

    static paths() {
        return {
            packages: require.context('../../..', true, /src\/bulma\/routes\/\w+$/),
            bulma: {
                coreRoutes: require.context('../bulma/routes', false, /.*\.js$/),
                routes: require.context('../../..', true, /src\/bulma\/routes\/\w+\.js$/),
                registers: require.context('../../../..', true, /src\/bulma\/register\.js$/),
                icons: require.context('../../../..', true, /src\/bulma\/icons\.js$/),
            },
        };
    }

    registerNavbarItem(component, order, mobile = false, desktop = true) {
        const item = {
            component, order, mobile, desktop,
        };

        this.vm.$store.commit('layout/navbar/registerItem', item);
    }

    registerSettingItem(component, order) {
        const item = { component, order };

        this.vm.$store.commit('layout/settings/registerItem', item);
    }
}

export default new App();
