import storeImporter from '../importers/storeImporter';
import themeImporter from '../importers/themeImporter';

const themes = themeImporter(require.context('@enso-ui/themes/bulma', false, /.*\.lazy\.scss$/));

export const modules = storeImporter(require.context('./layout', false, /.*\.js$/));

export const state = {
    home: true,
    themes: {},
    lightsOff: false,
    isMobile: false,
    isTablet: false,
    isTouch: false,
    footer: true,
    header: true,
};

export const getters = {
    current: (state, getters, rootState) => {
        if (!rootState.auth.isAuth) {
            return 'auth';
        }

        return state.home
            ? 'home'
            : 'default';
    },
};

export const mutations = {
    home: (state, status) => (state.home = status),
    setThemes: (state, themes) => (state.themes = themes),
    toggleLights: state => (state.lightsOff = !state.lightsOff),
    setIsMobile: (state, isMobile) => (state.isMobile = isMobile),
    setIsTablet: (state, isTablet) => (state.isTablet = isTablet),
    setIsTouch: (state, isTouch) => (state.isTouch = isTouch),
    hideFooter: state => (state.footer = false),
    showFooter: state => (state.footer = true),
    hideHeader: state => (state.header = false),
    showHeader: state => (state.header = true),
};

export const actions = {
    setTheme: ({ state, rootGetters }, theme = null) => {
        if (!theme) {
            theme = state.themes[rootGetters['preferences/theme']];
            localStorage.setItem('theme', theme);
        }

        Object.keys(themes).forEach(theme => themes[theme].unuse());

        try {
            themes[theme].use();
        } catch (e) {
            themes.light.use();
        }
    },
    loadTheme: async ({ dispatch }) => {
        const theme = localStorage.getItem('theme') || 'light';

        if (theme) {
            await dispatch('setTheme', theme);
        }
    },
    switchTheme: async ({ commit, dispatch }) => {
        commit('toggleLights');

        await setTimeout(() => dispatch('setTheme')
            .then(() => commit('toggleLights')), 150);
    },
};
