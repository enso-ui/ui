import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./companies', false, /.*\.js$/));
const Router = () => import('@core-pages/Router.vue');

export default {
    path: 'companies',
    component: Router,
    meta: {
        breadcrumb: 'companies',
        route: 'administration.companies.index',
    },
    children: routes,
};
