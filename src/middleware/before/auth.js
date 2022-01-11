const exceptions = ['notFound', 'unauthorized', 'maintenanceMode'];

const authorized = (store, to) => !store.state.appState
    || store.getters.routes.includes(to.name)
    || exceptions.includes(to.name);

export default (to, from, next, store) => {
    if (to.meta.guestGuard) {
        next({ path: '/' });
    } else if (store.state.appUpdate) {
        next(false);
    } else if (!authorized(store, to)) {
        next({ name: 'unauthorized' });
    } else {
        next();
    }
};
