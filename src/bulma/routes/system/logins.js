import routeImporter from '../../../modules/importers/routeImporter';

const routes = routeImporter.fromGlob(import.meta.glob('./logins/*.js', { eager: true }));
const Router = () => import('../../pages/Router.vue');

export default {
    path: 'logins',
    component: Router,
    meta: {
        breadcrumb: 'logins',
        route: 'system.logins.index',
        keepAlive: false,
    },
    children: routes,
};
