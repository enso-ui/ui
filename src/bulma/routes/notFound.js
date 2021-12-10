const NotFound = () => import('../pages/NotFound.vue');

export default {
    name: 'notFound',
    path: '/404',
    alias: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
        title: '404',
    },
};
