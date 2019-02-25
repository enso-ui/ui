const DashboardIndex = () => import('@core-pages/dashboard/Index.vue');

export default {
    name: 'dashboard.index',
    path: '/dashboard',
    component: DashboardIndex,
    meta: {
        breadcrumb: 'dashboard',
        title: 'Dashboard',
    },
};
