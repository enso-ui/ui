export default (to, from, next) => {
    if (to.meta.guestGuard) {
        next();
    } else {
        if (window.location.pathname !== '/') {
            localStorage.setItem('redirectAfterLogin', window.location.pathname);
        }

        next({ name: 'login' });
    }
};
