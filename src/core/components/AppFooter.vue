<script>
import { mapState } from 'vuex';

export default {
    name: 'AppFooter',

    computed: {
        ...mapState(['meta']),
    },

    render() {
        return this.$slots.default({
            meta: this.meta,
        });
    },
};
</script>
