<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { canAccess, errorHandler, i18n } from '@enso-ui/mixins';
import RouteMapper from '@enso-ui/route-mapper';

export default {
    name: 'CoreApp',

    mixins: [canAccess, errorHandler, i18n],

    data: () => ({
        routeMapper: null,
    }),

    computed: {
        ...mapState(['meta', 'routes']),
        ...mapState('auth', ['isAuth']),
        ...mapState('layout', ['home']),
        ...mapGetters('localisation', ['rtl']),
    },

    watch: {
        routes: {
            handler() {
                this.routeMapper = new RouteMapper(this.meta.appUrl, this.routes);
            },
            immediate: true,
            deep: true,
        },
    },

    created() {
        this.loadTheme();
    },

    methods: {
        ...mapActions('layout', ['loadTheme']),
        route(name, params, absolute) {
            return this.routeMapper.get(name, params, absolute);
        },
    },

    provide() {
        return {
            canAccess: this.canAccess,
            errorHandler: this.errorHandler,
            i18n: this.i18n,
            route: this.route,
        };
    },

    render() {
        return this.$scopedSlots.default({
            isAuth: this.isAuth,
            home: this.home,
            direction: this.rtl ? 'rtl' : 'ltr',
        });
    },
};
</script>
