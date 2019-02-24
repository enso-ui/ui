<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['meta']),
    },

    render() {
        return this.$scopedSlots.default({
            meta: this.meta,
        });
    },
};
</script>
