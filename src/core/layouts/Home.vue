<script>
import { auth } from '@enso-ui/auth/src/pinia/auth';
import { app } from '../../pinia/app';
import { layout } from '../../pinia/layout';
import { loadAppState } from '../../modules/loadState';

export default {
    name: 'Home',

    inject: ['routerErrorHandler'],

    data: () => ({
        loading: true,
    }),

    async created() {
        await loadAppState();
        this.enterApp();
    },

    methods: {
        enterApp() {
            const showQuote = app().showQuote;

            this.redirectIfNeeded();
            this.loading = false;

            if (!showQuote) {
                layout().setHome(false);
            }
        },
        redirectIfNeeded() {
            const store = auth();
            const { intendedRoute, intendedPath } = store;

            if (intendedRoute) {
                const { name, params, query } = intendedRoute;
                this.$router.push({ name, params, query })
                    .catch(this.routerErrorHandler);
                store.setIntendedRoute(null);
            } else if (intendedPath) {
                this.$router.push({ path: intendedPath })
                    .catch(this.routerErrorHandler);
                store.setIntendedPath(null);
            } else if (this.$route.meta.guestGuard) {
                this.$router.push({ path: '/' })
                    .catch(this.routerErrorHandler);
            }
        },
    },

    render() {
        return this.$slots.default({
            loading: this.loading,
            showQuote: app().showQuote,
            quote: app().meta.quote,
            hide: () => layout().setHome(false),
        });
    },
};
</script>
