<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'SidebarState',

    computed: {
        ...mapGetters('preferences', ['expandedSidebar']),
    },

    methods: {
        ...mapActions('preferences', ['setSidebarState']),
    },

    render() {
        return this.$slots.default({
            bindings: {
                modelValue: this.expandedSidebar,
            },
            events: {
                'update:modelValue': state => (this.setSidebarState(state)),
            },
        });
    },
};

</script>
