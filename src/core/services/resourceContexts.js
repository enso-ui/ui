export default {
    bulma: {
        coreRoutes: require.context('../../bulma/routes', false, /.*\.js$/),
        icons: require.context('../../../../..', true, /src\/bulma\/icons\.js$/),
        register: require.context('../../../../..', true, /src\/bulma\/register\.js$/),
        routes: require.context('../../../..', true, /src\/bulma\/routes\/\w+\.js$/),
    },
    common: {
        store: require.context('../../../..', true, /src\/store\/\w+\.js$/),
    },
    local: {
        store: require.context('@root/store', false, /.*\.js$/),
        routes: require.context('@root/routes', false, /.*\.js$/),
    },
};
