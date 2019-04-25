<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { canAccess, errorHandler, i18n } from '@enso-ui/mixins';

export default {
    name: 'CoreApp',

    mixins: [canAccess, errorHandler, i18n],

    provide() {
        return {
            canAccess: this.canAccess,
            errorHandler: this.errorHandler,
            i18n: this.i18n,
        };
    },

    computed: {
        ...mapState('auth', ['isAuth']),
        ...mapState('layout', ['home']),
        ...mapGetters('preferences', ['isRTL']),
    },

    created() {
        this.loadTheme();
    },

    methods: {
        ...mapActions('layout', ['loadTheme']),
    },

    render() {
        return this.$scopedSlots.default({
            isAuth: this.isAuth,
            home: this.home,
            direction: this.isRTL ? 'rtl' : 'ltr',
        });
    },
};
</script>
