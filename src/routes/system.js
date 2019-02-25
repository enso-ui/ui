import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./system', false, /.*\.js$/));
const Router = () => import('@core-pages/Router.vue');

export default {
    path: '/system',
    component: Router,
    meta: {
        breadcrumb: 'system',
    },
    children: routes,
};
