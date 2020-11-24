import router from './router';
import before from '../../middleware/before';

class ConfigRouter {
    static handle() {
        const store = router.app.$store;

        router.beforeEach((to, from, next) => before(to, from, next, store));

        router.onError(error => {
            const regExp = new RegExp('Loading chunk chunk-\w* failed.');

            if (regExp.test(error.message) && store.state.newRelease) {
                router.app.$emit('notify-new-release');
            } else {
                throw error;
            }
        });
    }
}

export default ConfigRouter;
