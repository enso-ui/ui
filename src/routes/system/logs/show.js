const LogShow = () => import('@core-pages/system/logs/Show.vue');

export default {
    name: 'system.logs.show',
    path: ':log',
    component: LogShow,
    meta: {
        breadcrumb: 'show',
        title: 'Show Log',
    },
};
