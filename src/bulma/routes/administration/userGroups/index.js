const UserGroupIndex = () => import('@core-pages/administration/userGroups/Index.vue');

export default {
    name: 'administration.userGroups.index',
    path: '',
    component: UserGroupIndex,
    meta: {
        breadcrumb: 'index',
        title: 'User Groups',
    },
};
