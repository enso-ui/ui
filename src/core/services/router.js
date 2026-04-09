import { createRouter, createWebHistory } from 'vue-router';
import RouteBuilder from './routeBuilder';
import before from '../../middleware/before';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: new RouteBuilder().handle(),
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 };
    },
});

router.beforeEach((to, from, next) => before(to, from, next));

router.onError(error => {
    const regExp = new RegExp('Loading chunk chunk-\\w* failed.');

    if (!regExp.test(error.message)) {
        throw error;
    }
});

export default router;
