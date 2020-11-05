class App {
    constructor() {
        this.packages = [];
        this.vm = null;
    }

    addRoutes(routes) {
        this.vm.$router.addRoutes(routes);
    }

    boot(vm, layout) {
        this.vm = vm;
        this.includePackages(layout);
    }

    includePackages(layout) {
        const requireContext = require
            .context('../../../..', true, /src\/\w+\/register\.js$/);

        requireContext.keys()
            .filter(file => file.includes(`src/${layout}/index.js`))
            .forEach(repository => {
                requireContext(repository);
                const name = repository.split('/').shift();
                this.packages.push(name);
            });
    }

    registerNavbarItem(component, order, mobile = false, desktop = true) {
        const item = {
            component, order, mobile, desktop,
        };

        this.vm.$store.commit('navbar/registerItem', item);
    }
}

export default new App();
