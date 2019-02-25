const NotFound = () => import('@core-pages/NotFound.vue');

export default {
    name: 'notFound',
    path: '/404',
    alias: '*',
    component: NotFound,
    meta: {
        title: '404',
    },
};
