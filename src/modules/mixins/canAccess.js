import Vue from 'vue';

Vue.mixin({
    methods: {
        canAccess(route) {
            return this.$store.getters.routes.includes(route);
        },
    },
});
