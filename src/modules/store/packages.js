export const state = {
    navbar: {},
};

export const getters = {
    navbarMobile: state => Object.values(state.navbar)
        .filter(item => item.mobile)
        .sort((a, b) => a.order - b.order)
        .map(item => item.component),
    navbarDesktop: state => Object.values(state.navbar)
        .filter(item => item.desktop)
        .sort((a, b) => a.order - b.order)
        .map(item => item.component),
};

export const mutations = {
    registerNavbar: (state, payload) => {
        state.navbar[payload.component] = {
            mobile: payload.mobile || true,
            desktop: payload.desktop || true,
            order: payload.order || 100,
            component: payload.component || 100,
        };
    },
};
