<script>
import { mapGetters } from 'vuex';

export default {
    name: 'PageHeader',

    computed: {
        ...mapGetters('preferences', ['isRTL']),
    },

    data: () => ({
        routing: false,
    }),

    watch: {
        $route() {
            this.routing = true;
            setTimeout(() => {
                this.routing = false;
            }, 100);
        },
    },

    render() {
        return this.$scopedSlots.default({
            routing: this.routing,
            isRTL: this.isRTL,
        });
    },
};
</script>
