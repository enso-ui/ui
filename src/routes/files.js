const FilesIndex = () => import('@core-pages/files/Index.vue');

export default {
    name: 'core.files.index',
    path: '/files',
    component: FilesIndex,
    meta: {
        breadcrumb: 'files',
        title: 'Files',
    },
};
