<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'Home',

    data: () => ({
        loading: true,
    }),

    computed: {
        ...mapState(['meta']),
        ...mapState('auth', ['isAuth', 'intendedRoute', 'intendedPath']),
        ...mapState(['appState', 'showQuote']),
    },

    watch: {
        appState(appState) {
            if (appState) {
                this.enterApp();
            }
        },
    },

    created() {
        this.loadAppState();
    },

    methods: {
        ...mapMutations('auth', ['setIntendedRoute', 'setIndentedPath']),
        ...mapMutations('layout', ['home']),
        ...mapActions(['loadAppState']),
        ...mapActions('layout', ['setTheme']),
        enterApp() {
            this.redirectIfNeeded();
            this.loading = false;

            if (!this.showQuote) {
                this.hide();
            }
        },
        redirectIfNeeded() {
            if (this.intendedRoute) {
                const { name, params, query } = this.intendedRoute;
                this.$router.push({ name, params, query });
                this.setIntendedRoute(null);
            } else if (this.intendedPath) {
                this.$router.push({ path: this.intendedPath });
                this.setIndentedPath(null);
            } else if (this.$route.meta.guestGuard) {
                this.$router.push({ path: '/' });
            }
        },
        hide() {
            this.home(false);
        },
    },

    render() {
        return this.$scopedSlots.default({
            loading: this.loading,
            showQuote: this.showQuote,
            quote: this.meta.quote,
            hide: this.hide,
        });
    },
};
</script>
