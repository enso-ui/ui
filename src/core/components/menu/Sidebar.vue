<script>
import { mapState } from 'vuex';

export default {
    name: 'Sidebar',

    computed: {
        ...mapState('menu', ['menus']),
    },

    render() {
        return this.$scopedSlots.default({
            menus: this.menus,
        });
    },
};
</script>
