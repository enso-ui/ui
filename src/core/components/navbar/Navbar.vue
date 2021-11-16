<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
    name: 'Navbar',
    inject: ['canAccess'],
    computed: {
        ...mapState(['meta', 'impersonating']),
        ...mapState('layout', ['isMobile', 'isTouch', 'sidebar']),
        ...mapGetters('layout/navbar', ['items']),
    },
    methods: {
        ...mapMutations('layout/sidebar', { toggleSidebar: 'toggle' }),
    },
    render() {
        return this.$slots.default({
            meta: this.meta,
            impersonating: this.impersonating,
            isMobile: this.isMobile,
            isTouch: this.isTouch,
            sidebar: this.sidebar,
            items: this.items,
            canAccessTasks: this.canAccess('tasks.index'),
            toggleSidebar: this.toggleSidebar,
        });
    },
};
</script>
