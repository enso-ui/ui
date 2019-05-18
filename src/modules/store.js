import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import storeImporter from '@core-modules/importers/storeImporter';
import router from '@root/router';
import localState from '@root/localState';
import bootEnums from '@core-modules/plugins/bootEnums';

const coreModules = storeImporter(require.context('./store', false, /.*\.js$/));

const coreState = {
    appState: false,
    guestState: false,
    showQuote: false,
    user: {},
    impersonating: null,
    meta: {},
    enums: {},
    routes: {},
    requests: [],
};

const coreGetters = {
    avatarLink: state => (state.appState
        ? route('core.avatars.show', state.user.avatar.id)
        : '#'),
    routes: state => Object.keys(state.routes),
    requests: state => state.requests.length,
    requestIndex: state => ({ url, method }) => state.requests
        .findIndex(request => method === request.method && url === request.url),
};

const coreMutations = {
    addRequest: (state, { method, url }) => state.requests.push({ method, url }),
    removeRequest: (state, index) => state.requests.splice(index, 1),
    setUser: (state, user) => (state.user = user),
    setImpersonating: (state, impersonating) => (state.impersonating = impersonating),
    setUserAvatar: (state, avatarId) => (state.user.avatar.id = avatarId),
    setMeta: (state, meta) => (state.meta = meta),
    setEnums: (state, enums) => (state.enums = enums),
    appState: (state, value) => (state.appState = value),
    guestState: (state, value) => (state.guestState = value),
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
};

const coreActions = {
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
            commit('localisation/setRtl', data.rtl);
            commit('localisation/setI18n', data.i18n);
            commit('layout/setThemes', data.themes);
            commit('layout/menu/update', data.preferences.global.expandedMenu);
            commit('setEnums', bootEnums(data.enums, getters['localisation/i18n']));
            commit('websockets/configure', data.websockets);
            commit('setMeta', data.meta);
            commit('setCsrfToken', data.meta.csrfToken);
            commit('setRoutes', data.routes);
            commit('setDefaultRoute', data.implicitRoute);

            if (data.meta.ravenKey) {
                Raven.config(data.meta.ravenKey)
                    .addPlugin(RavenVue, Vue)
                    .install();
            }

            dispatch('layout/setTheme')
                .then(() => {
                    if (data.local) {
                        dispatch('setLocalState', data.local)
                            .then(() => commit('appState', true));
                    } else {
                        commit('appState', true);
                    }
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
};

export {
    coreModules, coreState, coreGetters, coreMutations, coreActions,
};
