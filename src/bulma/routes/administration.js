import routeImporter from '../../modules/importers/routeImporter';

const routes = routeImporter(require.context('./administration', false, /.*\.js$/));
const Router = () => import('../pages/Router.vue');

export default {
    path: '/administration',
    component: Router,
    meta: {
        breadcrumb: 'administration',
    },
    children: routes,
};
