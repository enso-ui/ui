<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
    name: 'Navbar',
    inject: ['canAccess'],
    computed: {
        ...mapState(['meta', 'impersonating']),
        ...mapState('layout', ['isMobile', 'isTouch', 'sidebar']),
        ...mapGetters('navbar', ['desktopItems', 'mobileItems']),
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
            mobileItems: this.mobileItems,
            desktopItems: this.desktopItems,
            canAccessTasks: this.canAccess('tasks.index'),
            toggleSidebar: this.toggleSidebar,
        });
    },
};
</script>
