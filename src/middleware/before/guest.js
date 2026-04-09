import { useStore } from '../../core/services/pinia';

export default (to, from, next) => {
    const auth = useStore('auth');

    if (to.meta.guestGuard) {
        next();
    } else {
        if (!['login', '/'].includes(window.location.pathname)) {
            auth.setIntendedPath(window.location.pathname);
        }

        next({ name: 'login' });
    }
};
