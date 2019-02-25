import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./localisation', false, /.*\.js$/));
const Router = () => import('@core-pages/Router.vue');

export default {
    path: 'localisation',
    component: Router,
    meta: {
        breadcrumb: 'localisation',
        route: 'system.localisation.index',
    },
    children: routes,
};
