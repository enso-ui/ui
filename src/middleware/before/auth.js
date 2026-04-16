import { app } from '../../pinia/app';

const exceptions = ['notFound', 'unauthorized', 'maintenanceMode'];

const authorized = (app, to) => !app.meta?.appUrl
    || Object.keys(app.routes ?? {}).includes(to.name)
    || exceptions.includes(to.name);

export default (to, from, next) => {
    const state = app();

    if (to.meta.guestGuard) {
        next({ path: '/' });
    } else if (state.appUpdate) {
        next(false);
    } else if (!authorized(state, to)) {
        next({ name: 'unauthorized' });
    } else {
        next();
    }
};
