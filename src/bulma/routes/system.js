import routeImporter from '../../modules/importers/routeImporter';

const Router = () => import('../pages/Router.vue');
const routes = routeImporter.fromGlob(import.meta.glob('./system/*.js', { eager: true }));

export default {
    path: '/system',
    component: Router,
    meta: {
        breadcrumb: 'system',
    },
    children: routes,
};
