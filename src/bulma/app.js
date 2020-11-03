class App {
    constructor() {
        this.packages = [];
    }

    use(newPackage) {
        this.packages.push(newPackage);
    }

    boot(vm) {
        this.packages.forEach(init => init(vm));
    }
}

export default new App();
