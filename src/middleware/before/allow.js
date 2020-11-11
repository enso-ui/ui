import store from '../../core/services/store';

const exceptions = ['notFound', 'unauthorized'];

export default (to, from, next) => {
    if (!store.state.appState
            || store.getters.routes.includes(to.name)
            || exceptions.includes(to.name)) {
        next();
    } else {
        next({ name: 'unauthorized' });
    }
};
