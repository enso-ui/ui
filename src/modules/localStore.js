class LocalStore {
    constructor() {
        this.modules = {};
        this.state = {};
        this.getters = {};
        this.mutations = {};
        this.actions = {};
    }

    setModules(modules) {
        this.modules = modules;

        return this;
    }

    setState(state) {
        this.state = state;

        return this;
    }

    setGetters(getters) {
        this.getters = getters;

        return this;
    }

    setMutations(mutations) {
        this.mutations = mutations;

        return this;
    }

    setActions(actions) {
        this.actions = actions;

        return this;
    }
};

export default LocalStore;
