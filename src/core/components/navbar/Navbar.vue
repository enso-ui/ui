<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import eventBus from '../../services/eventBus';

export default {
    name: 'Navbar',

    inject: ['canAccess'],

    emits: ['stop-impersonating'],

    computed: {
        ...mapState(['meta', 'impersonating']),
        ...mapState('layout', ['isMobile', 'isTouch', 'sidebar']),
        ...mapGetters('layout/navbar', ['items']),
    },

    methods: {
        ...mapMutations('layout/sidebar', { toggleSidebar: 'toggle' }),
        stopImpersonating() {
            eventBus.$emit('stop-impersonating');
        },
    },

    render() {
        return this.$slots.default({
            meta: this.meta,
            impersonating: this.impersonating,
            stopImpersonating: this.stopImpersonating,
            isMobile: this.isMobile,
            isTouch: this.isTouch,
            sidebar: this.sidebar,
            items: this.items,
            toggleSidebar: this.toggleSidebar,
        });
    },
};
</script>
