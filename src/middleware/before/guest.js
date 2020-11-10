import store from '../../core/services/store';

export default (to, from, next) => {
    if (to.meta.guestGuard) {
        next();
    } else {
        if (!['login', '/'].includes(window.location.pathname)) {
            store.commit('auth/setIntendedPath', window.location.pathname);
        }

        next({ name: 'login' });
    }
};
