const Router = () => import('../pages/Router.vue');

export default {
    path: '/system',
    component: Router,
    meta: {
        breadcrumb: 'system',
    },
    children: [],
};
