<script>
import { useStore } from '../services/pinia';
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
        setIntendedRoute(value) {
            useStore('auth')?.setIntendedRoute(value);
        },
        setIntendedPath(value) {
            useStore('auth')?.setIntendedPath(value);
        },
        enterApp() {
            const showQuote = app().showQuote;

            this.redirectIfNeeded();
            this.loading = false;

            if (!showQuote) {
                this.hide();
            }
        },
        redirectIfNeeded() {
            const auth = useStore('auth');
            const intendedRoute = auth?.intendedRoute;
            const intendedPath = auth?.intendedPath;

            if (intendedRoute) {
                const { name, params, query } = intendedRoute;
                this.$router.push({ name, params, query })
                    .catch(this.routerErrorHandler);
                this.setIntendedRoute(null);
            } else if (intendedPath) {
                this.$router.push({ path: intendedPath })
                    .catch(this.routerErrorHandler);
                this.setIntendedPath(null);
            } else if (this.$route.meta.guestGuard) {
                this.$router.push({ path: '/' })
                    .catch(this.routerErrorHandler);
            }
        },
        hide() {
            layout().setHome(false);
        },
    },

    render() {
        return this.$slots.default({
            loading: this.loading,
            showQuote: app().showQuote,
            quote: app().meta.quote,
            hide: this.hide,
        });
    },
};
</script>
