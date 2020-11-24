const exceptions = ['notFound', 'unauthorized'];

export default (to, from, next, store) => {
    const shouldAllow = !store.state.appState
        || store.getters.routes.includes(to.name)
        || exceptions.includes(to.name);

    if (shouldAllow) {
        next();
    } else {
        next({ name: 'unauthorized' });
    }
};
