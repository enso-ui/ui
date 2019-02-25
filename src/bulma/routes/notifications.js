const Notifications = () => import('@core-pages/notifications/Index.vue');

export default {
    name: 'core.notifications.index',
    path: '/core/notifications/index',
    component: Notifications,
    meta: {
        breadcrumb: 'notifications',
        title: 'Notifications',
    },
};
