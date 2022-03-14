import axios from 'axios';
import route from '../plugins/route';

export const state = {
    global: {},
    local: {},
};

const store = payload => axios.patch(route('core.preferences.store'), payload);

const updateGlobal = () => store({ global: state.global });

export const getters = {
    global: state => state.global,
    local: state => route => state.local[route],
    lang: state => state.global.lang,
    theme: state => state.global.theme,
    expandedSidebar: state => state.global.expandedSidebar,
    toastrPosition: state => state.global.toastrPosition,
    bookmarks: state => state.global.bookmarks,
};

export const mutations = {
    set: (state, preferences) => {
        state.global = preferences.global;
        state.local = preferences.local;
    },
    global: (state, { key, value }) => (state.global[key] = value),
    lang: (state, lang) => (state.global.lang = lang),
    theme: (state, theme) => (state.global.theme = theme),
    toastrPosition: (state, position) => (state.global.toastrPosition = position),
    expandedSidebar: (state, expandedSidebar) => (state.global.expandedSidebar = expandedSidebar),
    bookmarks: (state, bookmarks) => (state.global.bookmarks = bookmarks),
    local: (state, value) => (state.local[state.route.name] = value),
};

export const actions = {
    setGlobal: async ({ commit }, payload) => {
        commit('global', payload);
        await updateGlobal();
    },
    setLocal: ({ commit, state }, value) => {
        commit('local', value);
        store({ route: state.route.name, value });
    },
    setLang: async ({
        commit, dispatch, getters, rootGetters,
    }, lang) => {
        const isRtl = rootGetters['localisation/rtl'];
        commit('lang', lang);
        localStorage.setItem('locale', lang);

        if (rootGetters['localisation/isRtl'](lang) !== isRtl) {
            await dispatch('setTheme', getters.theme);
        }

        await updateGlobal();
    },
    setTheme: async ({ commit, dispatch, rootGetters }, theme) => {
        const isRtl = rootGetters['localisation/rtl'];
        const nextTheme = theme.replace('-rtl', '') + (isRtl ? '-rtl' : '');
        commit('theme', nextTheme);

        await dispatch('layout/switchTheme', null, { root: true })
            .then(() => updateGlobal());
    },
    setToastrPosition: async ({ commit }, position) => {
        commit('toastrPosition', position);
        await updateGlobal();
    },
    setBookmarksState: async ({ commit }, bookmarks) => {
        commit('bookmarks', bookmarks);
        await updateGlobal();
    },
    setSidebarState: async ({ commit }, state) => {
        commit('expandedSidebar', state);
        commit('layout/sidebar/update', state, { root: true });
        await updateGlobal();
    },
};
