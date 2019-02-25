import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./permissions', false, /.*\.js$/));
const Router = () => import('@core-pages/Router.vue');


export default {
    path: 'permissions',
    component: Router,
    meta: {
        breadcrumb: 'permissions',
        route: 'system.permissions.index',
    },
    children: routes,
};
