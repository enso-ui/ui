const RoleCreate = () => import('@core-pages/system/roles/Create.vue');

export default {
    name: 'system.roles.create',
    path: 'create',
    component: RoleCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Role',
    },
};
