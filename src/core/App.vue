<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { canAccess, errorHandler, i18n } from '@enso-ui/mixins';
import route from '../modules/plugins/route';

export default {
    name: 'CoreApp',

    mixins: [canAccess, errorHandler, i18n],

    computed: {
        ...mapState('auth', ['isAuth']),
        ...mapState('layout', ['home']),
        ...mapGetters('localisation', ['rtl']),
    },

    created() {
        this.loadTheme();
    },

    methods: {
        ...mapActions('layout', ['loadTheme']),
        route(name, params, absolute) {
            return route(name, params, absolute);
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
