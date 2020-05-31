import route from '../plugins/route';

export const state = {
    global: {},
    local: {},
};

const store = payload => axios.patch(route('core.preferences.store'), payload);

const updateGlobal = () => store({ global: state.global });

const updateLocal = payload => store({ route: payload.route, value: payload.value });

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
    global: (state, payload) => (state.global = payload),
    lang: (state, lang) => (state.global.lang = lang),
    theme: (state, theme) => (state.global.theme = theme),
    toastrPosition: (state, position) => (state.global.toastrPosition = position),
    expandedSidebar: (state, expandedSidebar) => (state.global.expandedSidebar = expandedSidebar),
    bookmarks: (state, bookmarks) => (state.global.bookmarks = bookmarks),
    local: (state, payload) => (state.local[payload.route] = payload.value),
};

export const actions = {
    setGlobal: ({ commit }, payload) => {
        commit('global', payload);
        updateGlobal();
    },
    setLocal: ({ commit }, payload) => {
        commit('local', payload);
        updateLocal(payload);
    },
    setLang: ({ commit, dispatch, getters, rootGetters }, lang) => {
        commit('lang', lang);
        localStorage.setItem('locale', lang);
        if (rootGetters['localisation/isRtl'](lang) !== rootGetters['localisation/rtl']) {
            dispatch('setTheme', getters.theme);
        }
        updateGlobal();
    },
    setTheme: ({ commit, dispatch, rootGetters }, theme) => {
        const nextTheme = theme.replace('-rtl', '') + (rootGetters['localisation/rtl'] ? '-rtl' : '');
        commit('theme', nextTheme);
        dispatch('layout/switchTheme', null, { root: true })
            .then(() => updateGlobal());
    },
    setToastrPosition: ({ commit }, position) => {
        commit('toastrPosition', position);
        updateGlobal();
    },
    setBookmarksState: ({ commit }, bookmarks) => {
        commit('bookmarks', bookmarks);
        updateGlobal();
    },
    setSidebarState: ({ commit }, state) => {
        commit('expandedSidebar', state);
        commit('layout/sidebar/update', state, { root: true });
        updateGlobal();
    },
};
