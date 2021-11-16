const NotFound = () => import('../pages/NotFound.vue');

export default {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
        title: '404',
    },
};
