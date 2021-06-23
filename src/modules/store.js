import Vue from 'vue';
import { init as sentryInit } from '@sentry/browser';
import { Vue as SentryVue } from '@sentry/integrations';
import router from '../core/services/router';
import storeImporter from './importers/storeImporter';
import bootEnums from './plugins/bootEnums';
import i18n from './plugins/i18n';
import reportable from '@enso-ui/sentry';

const modules = storeImporter(require.context('./store', false, /.*\.js$/));

const legacyBuild = (data, state, commit) => {
    commit('setUser', data.user);
    commit('preferences/set', data.preferences);
    commit('setImpersonating', data.impersonating);
    commit('menu/set', data.menus);
    commit('localisation/setLanguages', data.languages);
    commit('localisation/setRtl', data.rtl);
    commit('localisation/setI18n', data.i18n);
    commit('layout/setThemes', data.themes);
    commit('setEnums', data.enums);
    commit('websockets/configure', data.websockets);
    commit('setMeta', data.meta);
    commit('setRoutes', data.routes);
    commit('setDefaultRoute', data.implicitRoute);
};

const state = {
    appState: false,
    enums: {},
    guestState: false,
    impersonating: null,
    meta: {},
    newRelease: false,
    pageTitle: null,
    requests: [],
    routes: {},
    showQuote: false,
    user: {},
};

const getters = {
    routes: state => Object.keys(state.routes),
    isWebview: () => typeof ReactNativeWebView !== 'undefined',
    requests: state => state.requests.length,
    requestIndex: state => ({ url, method }) => state.requests
        .findIndex(request => method === request.method && url === request.url),
};

const mutations = {
    addRequest: (state, { method, url }) => state.requests
        .push({ method, url }),
    appState: (state, value) => state.appState = value,
    guestState: (state, value) => state.guestState = value,
    newRelease: state => state.newRelease = true,
    removeRequest: (state, index) => state.requests.splice(index, 1),
    setCsrfToken: (state, token) => {
        state.meta.csrfToken = token;
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        window.Laravel = { csrfToken: token };
    },
    setDefaultRoute: (state, route) => router.addRoute({
        path: '/', redirect: { name: route },
    }),
    setEnums: (state, enums) => state.enums = bootEnums(enums, i18n),
    setImpersonating: (state, impersonating) => state.impersonating = impersonating,
    setMeta: (state, meta) => state.meta = meta,
    setPageTitle: (state, title) => state.pageTitle = title,
    setRoutes: (state, routes) => state.routes = routes,
    setShowQuote: (state, value) => state.showQuote = value,
    setUser: (state, user) => state.user = user,
    setUserAvatar: (state, avatarId) => state.user.avatar.id = avatarId,
};

const actions = {
    loadAppState(context) {
        const { state, commit, dispatch } = context;
        commit('appState', false);

        axios.get('/api/core/home').then(({ data }) => {
            if (data.user) {
                legacyBuild(data, state, commit);
            } else {
                data.forEach(({ mutation, state }) => commit(mutation, state));
            }

            commit('layout/sidebar/update', state.preferences.global.expandedSidebar);
            commit('setCsrfToken', state.meta.csrfToken);

            if (state.meta.sentryDsn) {
                sentryInit({
                    environment: state.meta.env,
                    dsn: state.meta.sentryDsn,
                    integrations: [new SentryVue({ Vue, logErrors: true })],
                    beforeSend: event => reportable(event),
                });
            }

            dispatch('layout/setTheme').then(() => {
                window.dispatchEvent(new CustomEvent('local-state-fetched', {
                    detail: { context, data: data.local },
                }));

                commit('appState', true);
            });
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

            if (!['login', 'password.email', 'password.reset'].includes(state.route.name)) {
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
