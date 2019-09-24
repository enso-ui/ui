import routeImporter from '../../modules/importers/routeImporter';

const routes = routeImporter(require.context('./system', false, /.*\.js$/));
const Router = () => import('../pages/Router.vue');

export default {
    path: '/system',
    component: Router,
    meta: {
        breadcrumb: 'system',
    },
    children: routes,
};
