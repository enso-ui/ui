import Vue from 'vue';
import Router from 'vue-router';
import RouteBuilder from './routeBuilder';
import store from './store';
import before from '../../middleware/before';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: new RouteBuilder().handle(),
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 };
    },
});

router.beforeEach((to, from, next) => before(to, from, next, store));

router.onError(error => {
    const regExp = new RegExp('Loading chunk chunk-\\w* failed.');

    if (regExp.test(error.message)) {
        router.app.$emit('notify-new-release');
    } else {
        throw error;
    }
});

export default router;
