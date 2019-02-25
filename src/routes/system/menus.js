import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./menus', false, /.*\.js$/));
const Router = () => import('@core-pages/Router.vue');

export default {
    path: 'menus',
    component: Router,
    meta: {
        breadcrumb: 'menus',
        route: 'system.menus.index',
    },
    children: routes,
};
