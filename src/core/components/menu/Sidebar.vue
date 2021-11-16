<script>
import { mapState } from 'vuex';

export default {
    name: 'Sidebar',

    computed: {
        ...mapState('menu', ['menus']),
    },

    render() {
        return this.$slots.default({
            menus: this.menus,
        });
    },
};
</script>
