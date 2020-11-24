import Vue from 'vue';
import Router from 'vue-router';
import RouteBuilder from './routeBuilder';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: new RouteBuilder().handle(),
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 };
    },
});

export default router;
