const Router = () => import('../pages/Router.vue');

export default {
    path: '/administration',
    component: Router,
    meta: {
        breadcrumb: 'administration',
    },
    children: [],
};
