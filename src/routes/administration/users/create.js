const UserCreate = () => import('@core-pages/administration/users/Create.vue');

export default {
    name: 'administration.users.create',
    path: 'create/:person',
    component: UserCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create User',
    },
};
