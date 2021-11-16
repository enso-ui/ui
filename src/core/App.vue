<script>
import { h } from 'vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import { canAccess, errorHandler, routerErrorHandler } from '@enso-ui/mixins';
import RouteMapper from '@enso-ui/route-mapper';
import toastr from '@enso-ui/toastr';
import i18n from '../modules/plugins/i18n';

export default {
    name: 'CoreApp',

    mixins: [canAccess, errorHandler, routerErrorHandler],

    provide() {
        return {
            canAccess: this.canAccess,
            errorHandler: this.errorHandler,
            i18n: this.i18n,
            route: this.route,
            routerErrorHandler: this.routerErrorHandler,
            toastr: this.toastr,
        };
    },

    data: () => ({
        routeMapper: null,
        toastr,
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
        i18n(key, params = null) {
            return i18n(key, params);
        },
        route(name, params, absolute) {
            return this.routeMapper.get(name, params, absolute);
        },
    },

    render() {
        return this.$slots.default({
            isAuth: this.isAuth,
            home: this.home,
            direction: this.rtl ? 'rtl' : 'ltr',
        });
    },
};
</script>
