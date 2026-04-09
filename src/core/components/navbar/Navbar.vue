<script>
import App from '../../app';
import eventBus from '../../services/eventBus';
import { app as useApp } from '../../pinia/app';
import { layout as useLayout } from '../../pinia/layout';

export default {
    name: 'Navbar',

    inject: ['canAccess'],

    emits: ['stop-impersonating'],

    methods: {
        toggleSidebar() {
            useLayout().toggleSidebar();
        },
        stopImpersonating() {
            eventBus.$emit('stop-impersonating');
        },
    },

    render() {
        const app = useApp();
        const layout = useLayout();
        const routes = Object.keys(app.routes);
        const items = App.navbarItems.sort((a, b) => a.order - b.order)
            .filter(({ permission }) => !permission || routes.includes(permission));

        return this.$slots.default({
            meta: app.meta,
            impersonating: app.impersonating,
            stopImpersonating: this.stopImpersonating,
            isMobile: layout.isMobile,
            isTouch: layout.isTouch,
            sidebar: layout.sidebar,
            items,
            toggleSidebar: this.toggleSidebar,
        });
    },
};
</script>
