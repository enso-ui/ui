import Vue from 'vue';
import Vuex from 'vuex';
import Resources from './resources.js';
import storeImporter from '../../modules/importers/storeImporter';
import {
    actions, getters, modules, mutations, state,
} from '../../modules/store.js';

const packageModules = () => {
    const modules = storeImporter(Resources.store());

    return Object.keys(modules)
        .reduce((module, key) => {
            module[key.split('/').pop()] = modules[key];

            return module;
        }, {});
};

const store = {
    strict: true,
    modules: { ...modules, ...packageModules(), ...storeImporter(Resources.localStore()) },
    state,
    getters,
    mutations,
    actions,
};

Vue.use(Vuex);

export default new Vuex.Store(store);
