import { createStore } from 'vuex';
import Resources from './resources';
import importer from '../../modules/importers/storeImporter';
import {
    actions, getters, modules, mutations, state,
} from '../../modules/store';

const packageModules = () => {
    const modules = importer(Resources.store());

    return Object.keys(modules).reduce((module, key) => {
        module[key.split('/').pop()] = modules[key];
        return module;
    }, {});
};

export default createStore({
    strict: true,
    modules: { ...modules, ...packageModules(), ...importer(Resources.localStore()) },
    state,
    getters,
    mutations,
    actions,
});
