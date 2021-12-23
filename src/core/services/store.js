import { createStore } from 'vuex';
import Resources from './resources';
import importer from '../../modules/importers/storeImporter';
import {
    actions, getters, modules, mutations, state,
} from '../../modules/store';

const packageStore = () => {
    const modules = importer(Resources.store());

    return Object.keys(modules).reduce((module, key) => {
        module[key.split('/').pop()] = modules[key];
        return module;
    }, {});
};

Object.assign(modules, packageStore(), importer(Resources.localStore()));

export default createStore({
    strict: process.env.NODE_ENV !== 'production',
    modules,
    state,
    getters,
    mutations,
    actions,
});
