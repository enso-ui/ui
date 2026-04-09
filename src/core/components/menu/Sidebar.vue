<script>
import { useStore } from '../../services/pinia';

export default {
    name: 'Sidebar',

    render() {
        return this.$slots.default({
            menus: useStore('menu')?.menus ?? [],
        });
    },
};
</script>
