<script>
import { menu } from '@enso-ui/menus/src/pinia/menu';

export default {
    name: 'Sidebar',

    render() {
        return this.$slots.default({
            menus: menu().menus,
        });
    },
};
</script>
