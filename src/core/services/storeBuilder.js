import Resources from '../../core/services/resources.js';
import storeImporter from '../../modules/importers/storeImporter';
import {
    actions, getters, modules, mutations, state,
} from '../../modules/store.js';

class StoreBuilder {
    constructor() {
        this.localModules = storeImporter(Resources.localStore());
    }

    handle() {
        return {
            strict: true,
            modules: { ...modules, ...this.packageModules(), ...this.localModules },
            state,
            getters,
            mutations,
            actions,
        };
    }

    packageModules() {
        const modules = storeImporter(Resources.store());

        return Object.keys(modules)
            .reduce((module, key) => {
                module[key.split('/').pop()] = modules[key];

                return module;
            }, {});
    }

}

export default StoreBuilder;
