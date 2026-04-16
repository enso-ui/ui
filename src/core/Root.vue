<script>
import { isNavigationFailure } from 'vue-router';
import RouteMapper from '@enso-ui/route-mapper';
import toastr from '@enso-ui/toastr';
import http from 'axios';
import i18n from '@enso-ui/localisation/i18n';
import { auth } from '@enso-ui/auth/src/pinia/auth';
import { localisation } from '@enso-ui/localisation/src/pinia/localisation';
import ErrorHandler from './services/errorHandler';
import { app } from '../pinia/app';
import { layout } from '../pinia/layout';

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
        meta() {
            return app().meta;
        },
        routes() {
            return app().routes;
        },
        isAuth() {
            return auth().isAuth;
        },
        home() {
            return layout().home;
        },
        routeCollection() {
            return Object.keys(this.routes);
        },
        rtl() {
            return localisation().rtl;
        },
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

    async created() {
        await this.loadTheme();
    },

    beforeMount() {
        document.body.setAttribute('dir', this.direction);
    },

    methods: {
        loadTheme() {
            return layout().loadTheme();
        },
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
