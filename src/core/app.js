import routeImporter from '../modules/importers/routeImporter';

class App {
    constructor() {
        this.packages = [];
        this.vm = null;
    }

    boot(vm, layout) {
        this.vm = vm;

        this.includePackages(layout)
            .addRoutes(layout)
            .addRegisters(layout)
            .addIcons(layout);
    }

    includePackages() {
        App.paths().packages.keys()
            .forEach(repository => this.packages.push(repository.split('/')[1]));

        return this;
    }

    addRoutes(layout) {
        this.vm.$router.addRoutes(routeImporter(App.paths()[layout].routes));

        return this;
    }

    addRegisters(layout) {
        App.importAll(App.paths()[layout].registers);

        return this;
    }

    addIcons(layout) {
        App.importAll(App.paths()[layout].icons);

        return this;
    }

    static importAll(requireContext) {
        requireContext.keys().forEach(file => requireContext(file));
    }

    static paths() {
        return {
            packages: require.context('../../..', true, /src\/bulma\/routes\/\w+$/),
            bulma: {
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

        this.vm.$store.commit('navbar/registerItem', item);
    }
}

export default new App();
