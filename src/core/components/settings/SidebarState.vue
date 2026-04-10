<script>
import { preferences } from '../../../pinia/preferences';

export default {
    name: 'SidebarState',

    methods: {
        setSidebarState(state) {
            return preferences().setSidebarState(state);
        },
    },

    render() {
        return this.$slots.default({
            bindings: {
                modelValue: preferences().global.expandedSidebar,
            },
            events: {
                'update:modelValue': state => (this.setSidebarState(state)),
            },
        });
    },
};

</script>
