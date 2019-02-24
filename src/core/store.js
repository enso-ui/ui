import Vue from 'vue';
import Vuex from 'vuex';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import router from './router';
import storeImporter from './modules/importers/storeImporter';
import localState from './localState';
import bootEnums from './classes/enso/Enum/bootEnums';

Vue.use(Vuex);

const modules = storeImporter(require.context('./store', false, /.*\.js$/));

export default new Vuex.Store({
    strict: true,

    modules,

    state: {
        guestState: false,
        appState: false,
        showQuote: false,
        user: {},
        impersonating: null,
        meta: {},
        enums: {},
        routes: {},
        lastRoute: null,
    },

    getters: {
        avatarLink: state => (state.appState
            ? route('core.avatars.show', state.user.avatar.id)
            : '#'),
        routes: state => Object.keys(state.routes),
    },

    mutations: {
        guestState: state => (state.guestState = true),
        setUser: (state, user) => (state.user = user),
        setImpersonating: (state, impersonating) => (state.impersonating = impersonating),
        setUserAvatar: (state, avatarId) => (state.user.avatar.id = avatarId),
        setMeta: (state, meta) => (state.meta = meta),
        setEnums: (state, enums) => (state.enums = enums),
        appState: (state, value) => (state.appState = value),
        setShowQuote: (state, value) => (state.showQuote = value),
        setRoutes: (state, routes) => (state.routes = routes),
        setDefaultRoute: (state, route) => {
            router.addRoutes([{
                path: '/',
                redirect: { name: route },
            }]);
        },
        setCsrfToken: (state, token) => {
            state.meta.csrfToken = token;
            axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
            window.Laravel = {
                csrfToken: token,
            };
        },
        setLastRoute: (state, route) => (state.lastRoute = route),
    },

    actions: {
        loadGuestState({ commit }) {
            axios.get('/api/meta', {
                params: { locale: localStorage.getItem('locale') },
            }).then(({ data }) => {
                const { meta, i18n, routes } = data;
                const lang = Object.keys(i18n).shift();
                commit('localisation/setI18n', i18n);
                commit('preferences/lang', lang);
                commit('setMeta', meta);
                commit('setRoutes', routes);
                commit('guestState', true);
            });
        },
        loadAppState({ commit, dispatch, getters }) {
            commit('appState', false);

            axios.get('/api/core/home').then(({ data }) => {
                commit('setUser', data.user);
                commit('preferences/set', data.preferences);
                commit('setImpersonating', data.impersonating);
                commit('menus/set', data.menus);
                commit('localisation/setLanguages', data.languages);
                commit('localisation/setI18n', data.i18n);
                commit('layout/setThemes', data.themes);
                commit('layout/menu/update', data.preferences.global.expandedMenu);
                commit('setMeta', data.meta);
                commit('setEnums', bootEnums(data.enums, getters['localisation/__']));
                commit('setCsrfToken', data.meta.csrfToken);
                commit('setRoutes', data.routes);
                commit('setDefaultRoute', data.implicitRoute);

                if (data.ravenKey) {
                    Raven.config(data.meta.ravenKey)
                        .addPlugin(RavenVue, Vue)
                        .install();
                }

                dispatch('layout/setTheme')
                    .then(() => {
                        if (data.local) {
                            dispatch('setLocalState', data.local);
                        }
                        setTimeout(() => commit('appState', true), 200);
                    });
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('auth/logout');
                    router.push({ name: 'login' });
                }
            });
        },
        setLocalState(context, state) {
            localState(context, state);
        },
    },
});
