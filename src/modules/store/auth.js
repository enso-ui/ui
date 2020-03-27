export const state = {
    isAuth: localStorage.getItem('isAuth') === 'true',
    intendedRoute: null,
    intendedPath: null,
};

export const mutations = {
    login(state) {
        state.isAuth = true;
        localStorage.setItem('isAuth', true);
    },
    logout(state) {
        state.isAuth = false;
        localStorage.setItem('isAuth', false);
    },
    setIntendedRoute: (state, value) => (state.intendedRoute = value),
    setIntendedPath: (state, value) => (state.intendedPath = value),
};
