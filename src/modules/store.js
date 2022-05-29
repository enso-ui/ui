import axios from 'axios';
import App from '../core/app';
import Sentry from './sentry';
import router from '../core/services/router';
import storeImporter from './importers/storeImporter';
import bootEnums from './plugins/bootEnums';
import i18n from './plugins/i18n';

const modules = storeImporter(require.context('./store', false, /.*\.js$/));

const state = {
    appState: false,
    appUpdate: false,
    enums: {},
    guestState: false,
    impersonating: null,
    meta: {},
    requests: [],
    routes: {},
    showQuote: false,
    user: {},
    avatarKey: 1,
};

const getters = {
    route: state => router.currentRoute.value,
    routes: state => Object.keys(state.routes),
    isWebview: () => typeof ReactNativeWebView !== 'undefined',
    requests: state => state.requests.length,
    requestIndex: state => ({ url, method }) => state.requests
        .findIndex(request => method === request.method && url === request.url),
};

const mutations = {
    addRequest: (state, { method, url }) => state.requests.push({ method, url }),
    appState: (state, value) => state.appState = value,
    guestState: (state, value) => state.guestState = value,
    newRelease: state => state.appUpdate = true,
    removeRequest: (state, index) => state.requests.splice(index, 1),
    setDefaultRoute: (state, route) =>  router.addRoute({
        name: 'default',
        path: '/',
        redirect: { name: route },
    }),
    setEnums: (state, enums) => state.enums = bootEnums(enums, i18n),
    setImpersonating: (state, impersonating) => state.impersonating = impersonating,
    setMeta: (state, meta) => state.meta = meta,
    setPageTitle: (state, title) => state.meta.pageTitle = title,
    setRoutes: (state, routes) => state.routes = routes,
    setShowQuote: (state, value) => state.showQuote = value,
    setUser: (state, user) => state.user = user,
    updateAvatar: state => state.avatarKey++,
};

const actions = {
    loadAppState({ state, commit, dispatch }) {
        commit('appState', false);

        axios.get('/api/core/home').then(({ data }) => {
            data.forEach(({ mutation, state }) => commit(mutation, state));

            commit('layout/sidebar/update', state.preferences.global.expandedSidebar);
            window.Laravel = state.meta.csrfToken;

            if (state.meta.sentryDsn) {
                const sentry = new Sentry(App.instance, App.router);
                sentry.init(state);
            }

            dispatch('layout/setTheme').then(() => commit('appState', true));

            if (state.meta.env === 'local') {
                window.http = axios;
            }
        }).catch(error => {
            if (error.response && error.response.status === 401) {
                commit('auth/logout');
                router.push({ name: 'login' });
            } else {
                throw error;
            }
        });
    },
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

            const loginRoutes = ['login', 'password.email', 'password.reset'];

            if (! state.getters.route || !loginRoutes.includes(state.getters.route.name)) {
                router.push({ name: 'login' });
            }
        });
    },
    setPageTitle({ commit }, title) {
        commit('setPageTitle', title);
        commit('bookmarks/title', title);
    },
};

export {
    modules, state, getters, mutations, actions,
};
