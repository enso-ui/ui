const Unauthorized = () => import('../pages/Unauthorized.vue');

export default {
    name: 'unauthorized',
    path: '/403',
    component: Unauthorized,
    meta: {
        title: 'Unauthorized',
    },
};
