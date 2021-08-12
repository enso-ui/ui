const Router = () => import('../pages/Router.vue');

export default {
    path: '/integrations',
    component: Router,
    meta: {
        breadcrumb: 'integrations',
    },
    children: [],
};
