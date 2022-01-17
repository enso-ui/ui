<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import App from '../../app';
import eventBus from '../../services/eventBus';

export default {
    name: 'Navbar',

    inject: ['canAccess'],

    emits: ['stop-impersonating'],

    computed: {
        ...mapState(['meta', 'impersonating']),
        ...mapState('layout', ['isMobile', 'isTouch', 'sidebar']),
        ...mapGetters(['routes']),
        items() {
            return App.navbarItems.sort((a, b) => a.order - b.order)
                .filter(({ permission }) => !permission
                    || this.routes.includes(permission));
        },
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
