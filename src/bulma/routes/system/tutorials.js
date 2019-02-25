import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./tutorials', false, /.*\.js$/));
const Router = () => import('@core-pages/Router.vue');

export default {
    path: 'tutorials',
    component: Router,
    meta: {
        breadcrumb: 'tutorials',
        route: 'system.tutorials.index',
    },
    children: routes,
};
