<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { isNavigationFailure } from 'vue-router';
import RouteMapper from '@enso-ui/route-mapper';
import toastr from '@enso-ui/toastr';
import http from 'axios';
import i18n from '../modules/plugins/i18n';
import ErrorHandler from './services/errorHandler';

http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default {
    name: 'Root',

    provide() {
        return {
            canAccess: this.canAccess,
            errorHandler: this.handleError,
            http,
            i18n,
            route: this.route,
            routerErrorHandler: this.routerErrorHandler,
            toastr,
        };
    },

    data: vm => ({
        http,
        i18n,
        routeMapper: null,
        toastr,
        errorHandler: new ErrorHandler(vm),
    }),

    computed: {
        ...mapState(['meta', 'routes']),
        ...mapState('auth', ['isAuth']),
        ...mapState('layout', ['home']),
        ...mapGetters({ routeCollection: 'routes' }),
        ...mapGetters('localisation', ['rtl']),
        direction() {
            return this.rtl ? 'rtl' : 'ltr';
        },
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

    beforeMount() {
        document.body.setAttribute('dir', this.direction);
    },

    methods: {
        ...mapActions('layout', ['loadTheme']),
        canAccess(route) {
            return this.routeCollection.includes(route);
        },
        handleError(error) {
            this.errorHandler.handle(error);
        },
        route(name, params, absolute) {
            return this.routeMapper.get(name, params, absolute);
        },
        routerErrorHandler(error) {
            if (!isNavigationFailure(error)) {
                throw error;
            }
        },
    },

    render() {
        return this.$slots.default({
            isAuth: this.isAuth,
            home: this.home,
        });
    },
};
</script>
