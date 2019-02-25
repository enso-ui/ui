import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./logs', false, /.*\.js$/));
const Router = () => import('@core-pages/Router.vue');

export default {
    path: 'logs',
    component: Router,
    meta: {
        breadcrumb: 'logs',
        route: 'system.logs.index',
    },
    children: routes,
};
