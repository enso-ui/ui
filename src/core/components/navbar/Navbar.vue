<script>
import App from '../../app';
import eventBus from '../../services/eventBus';
import { app } from '../../../pinia/app';
import { layout } from '../../../pinia/layout';

export default {
    name: 'Navbar',

    inject: ['canAccess'],

    emits: ['stop-impersonating'],

    render() {
        const state = app();
        const ui = layout();
        const routes = Object.keys(state.routes);
        const items = App.navbarItems.sort((a, b) => a.order - b.order)
            .filter(({ permission }) => !permission || routes.includes(permission));

        return this.$slots.default({
            meta: state.meta,
            impersonating: state.impersonating,
            stopImpersonating: () => eventBus.$emit('stop-impersonating'),
            isMobile: ui.isMobile,
            isTouch: ui.isTouch,
            sidebar: ui.sidebar,
            items,
            toggleSidebar: () => ui.toggleSidebar(),
        });
    },
};
</script>
