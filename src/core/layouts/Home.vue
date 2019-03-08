<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'Home',

    data: () => ({
        loading: true,
    }),

    computed: {
        ...mapState('auth', ['isAuth']),
        ...mapState(['meta', 'lastRoute']),
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
        ...mapMutations(['setLastRoute']),
        ...mapMutations('layout', ['home']),
        ...mapActions(['loadAppState']),
        ...mapActions('layout', ['setTheme']),
        enterApp() {
            this.route();
            this.loading = false;

            if (!this.showQuote) {
                this.hide();
            }
        },
        route() {
            if (!this.lastRoute) {
                if (this.$route.meta.guestGuard) {
                    this.$router.push({ path: '/' });
                }
                return;
            }

            const { name, params, query } = this.lastRoute;
            this.$router.push({ name, params, query });
            this.setLastRoute(null);
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
