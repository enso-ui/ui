import { auth } from '@enso-ui/auth/src/pinia/auth';

export default (to, from, next) => {
    const store = auth();

    if (to.meta.guestGuard) {
        next();
    } else {
        if (!['login', '/'].includes(window.location.pathname)) {
            store.setIntendedPath(window.location.pathname);
        }

        next({ name: 'login' });
    }
};
