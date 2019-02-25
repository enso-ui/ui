import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./roles', false, /.*\.js$/));
const Router = () => import('@core-pages/Router.vue');


export default {
    path: 'roles',
    component: Router,
    meta: {
        breadcrumb: 'roles',
        route: 'system.roles.index',
    },
    children: routes,
};
