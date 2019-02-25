const TutorialCreate = () => import('@core-pages/system/tutorials/Create.vue');

export default {
    name: 'system.tutorials.create',
    path: 'create',
    component: TutorialCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Tutorial',
    },
};
