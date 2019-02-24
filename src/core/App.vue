<script>
import { mapState, mapActions } from 'vuex';

export default {
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
