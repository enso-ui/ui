import Vue from 'vue';
import Vuex from 'vuex';
import StoreBuilder from './storeBuilder';

Vue.use(Vuex);

export default new Vuex.Store(new StoreBuilder().handle());
