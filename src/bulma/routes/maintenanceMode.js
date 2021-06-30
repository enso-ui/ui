const MaintenanceMode = () => import('../pages/MaintenanceMode.vue');

export default {
    name: 'maintenanceMode',
    path: '/503',
    component: MaintenanceMode,
    meta: {
        title: 'Maintenance Mode',
    },
};
