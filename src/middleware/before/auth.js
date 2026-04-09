import { useStore } from '../../core/services/pinia';

const exceptions = ['notFound', 'unauthorized', 'maintenanceMode'];

const authorized = (app, to) => !app.meta?.appUrl
    || Object.keys(app.routes ?? {}).includes(to.name)
    || exceptions.includes(to.name);

export default (to, from, next) => {
    const app = useStore('app');

    if (to.meta.guestGuard) {
        next({ path: '/' });
    } else if (app.appUpdate) {
        next(false);
    } else if (!authorized(app, to)) {
        next({ name: 'unauthorized' });
    } else {
        next();
    }
};
