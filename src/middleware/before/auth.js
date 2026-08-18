import { app } from '../../pinia/app';
import { loadAppState } from '../../modules/loadState';

const exceptions = ['notFound', 'unauthorized', 'maintenanceMode'];

const authorized = (app, to) => Object.keys(app.routes ?? {}).includes(to.name)
    || exceptions.includes(to.name);

export default async (to, from, next) => {
    const loaded = await loadAppState();

    if (!loaded) {
        next(false);

        return;
    }

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
