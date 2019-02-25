import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./people', false, /.*\.js$/));
const RouterView = () => import('@core-pages/Router.vue');

export default {
    path: 'people',
    component: RouterView,
    meta: {
        breadcrumb: 'people',
        route: 'administration.people.index',
    },
    children: routes,
};
