<script>
import { mapState, mapActions } from 'vuex';
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
        });
    },
};
</script>
