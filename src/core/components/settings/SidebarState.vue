<script>
import { preferences } from '../../../pinia/preferences';

export default {
    name: 'SidebarState',

    render() {
        return this.$slots.default({
            bindings: {
                modelValue: preferences().global.expandedSidebar,
            },
            events: {
                'update:modelValue': state => preferences().setSidebarState(state),
            },
        });
    },
};

</script>
