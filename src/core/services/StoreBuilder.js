import storeImporter from '../../modules/importers/storeImporter';
import {
    coreActions, coreGetters, coreModules, coreMutations, coreState,
} from '../../modules/store.js';
import paths from '../paths';

class StoreBuilder {
    constructor(localStore) {
        this.localStore = localStore;
    }

    get() {
        const { modules, state, getters, mutations, actions } = this.localStore;

        return {
            strict: true,
            modules: { ...coreModules, ...this.packageModules(), ...modules },
            state: { ...coreState, ...state },
            getters: { ...coreGetters, ...getters },
            mutations: { ...coreMutations, ...mutations },
            actions: { ...coreActions, ...actions },
        };
    }

    packageModules() {
        const modules = storeImporter(paths.common.store);

        return Object.keys(modules)
            .reduce((module, key) => {
                module[key.split('/').pop()] = modules[key];

                return module;
            }, {});
    }

}

export default StoreBuilder;
