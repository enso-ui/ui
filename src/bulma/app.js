class App {
    constructor() {
        this.packages = [];
        this.root = null;
    }

    init(root) {
        this.root = root;
        this.load();
        this.boot();

        return this;
    }

    use(newPackage) {
        this.packages.push(newPackage);
    }

    boot() {
        this.packages.forEach(init => init(this.vm));
    }

    load() {
        const packages = require.context('../../..', true, /src\/bulma\/index\.js$/);
        packages.keys().forEach(packages);

        return this;
    }
}

export default new App();
