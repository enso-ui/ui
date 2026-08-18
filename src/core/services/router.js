import { createRouter, createWebHistory } from 'vue-router';
import RouteBuilder from './routeBuilder';
import { handlePreloadError, handleRouterError } from './dynamicImportErrorHandler';
import before from '../../middleware/before';

window.addEventListener('vite:preloadError', handlePreloadError);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: new RouteBuilder().handle(),
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 };
    },
});

router.beforeEach((to, from, next) => before(to, from, next));

router.onError(handleRouterError);

export default router;
