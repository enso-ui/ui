const LocalisationEdit = () => import('@core-pages/system/localisation/Edit.vue');

export default {
    name: 'system.localisation.edit',
    path: ':language/edit',
    component: LocalisationEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Language',
    },
};
