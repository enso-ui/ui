<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Navbar',
    inject: ['canAccess'],
    computed: {
        ...mapState(['meta', 'impersonating']),
        ...mapState('layout', ['isMobile', 'isTouch', 'sidebar']),
    },
    methods: {
        ...mapMutations('layout/sidebar', { toggleSidebar: 'toggle' }),
    },
    render() {
        return this.$scopedSlots.default({
            meta: this.meta,
            impersonating: this.impersonating,
            isMobile: this.isMobile,
            isTouch: this.isTouch,
            sidebar: this.sidebar,
            canAccessTasks: this.canAccess('tasks.index'),
            toggleSidebar: this.toggleSidebar,
        });
    },
};
</script>
