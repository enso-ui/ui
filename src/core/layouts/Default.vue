<script>
import eventBus from '../services/eventBus';
import { localisation } from '@enso-ui/localisation/src/pinia/localisation';
import { layout } from '../../pinia/layout';
import { preferences } from '../../pinia/preferences';
import { loadAppState } from '../../modules/loadState';

export default {
    name: 'Default',

    inject: ['errorHandler', 'http', 'route', 'toastr'],

    data: () => ({
        appState: false,
    }),

    computed: {
        isTablet() {
            return layout().isTablet;
        },
    },

    methods: {
        rtl() {
            const lang = preferences().global.lang;

            return localisation().rtlLanguages.includes(lang);
        },
        async bootstrap(force = false) {
            this.appState = false;

            const loaded = await loadAppState(force);

            if (!loaded) {
                return;
            }

            this.toastr.setup(preferences().global.toastrPosition);

            if (this.$route.path === '/') {
                this.$router.push({ name: 'default' });
            }

            this.appState = true;
        },
        addTouchBreakpointsListeners() {
            document.addEventListener('visibilitychange', this.updateTouchMode);
            window.addEventListener('DOMContentLoaded', this.updateTouchMode);
            window.addEventListener('resize', this.updateTouchMode);
            window.visualViewport?.addEventListener('resize', this.updateTouchMode);
        },
        updateTouchMode() {
            const TabletMaxWidth = 1023;
            const MobileMaxWidth = 768;
            const ui = layout();

            if (!document.hidden) {
                const width = window.visualViewport?.width
                    || document.documentElement.clientWidth
                    || window.innerWidth;

                ui.isTablet = width <= TabletMaxWidth;
                ui.isMobile = width <= MobileMaxWidth;
                ui.isTouch = width <= TabletMaxWidth || width <= MobileMaxWidth;
            }
        },
        removeTouchBreakpointsListeners() {
            document.removeEventListener('visibilitychange', this.updateTouchMode);
            window.removeEventListener('DOMContentLoaded', this.updateTouchMode);
            window.removeEventListener('resize', this.updateTouchMode);
            window.visualViewport?.removeEventListener('resize', this.updateTouchMode);
        },
        startImpersonating(id) {
            this.http.get(this.route('core.impersonate.start', id))
                .then(({ data }) => {
                    this.toastr.warning(data.message);
                    this.bootstrap(true);
                }).catch(this.errorHandler);
        },
        stopImpersonating() {
            this.http.get(this.route('core.impersonate.stop'))
                .then(({ data }) => {
                    this.toastr.info(data.message);
                    this.bootstrap(true);
                }).catch(this.errorHandler);
        },
    },

    watch: {
        isTablet: {
            handler() {
                const ui = layout();

                return this.isTablet
                    ? ui.hideSidebar()
                    : ui.showSidebar();
            },
        },
    },

    async created() {
        eventBus.$on('start-impersonating', this.startImpersonating);
        eventBus.$on('stop-impersonating', this.stopImpersonating);
        await this.bootstrap();
    },

    beforeMount() {
        this.addTouchBreakpointsListeners();
        this.updateTouchMode();
    },

    unmounted() {
        this.removeTouchBreakpointsListeners();
    },

    render() {
        if (!this.appState) {
            return null;
        }

        const ui = layout();
        const prefs = preferences();
        const {
            header, sidebar, settings, footer,
        } = ui;
        const { bookmarks } = prefs.global;
        const rtl = this.rtl();

        return this.$slots.default({
            appState: true,
            sidebar,
            rtl,
            slideIn: rtl ? 'slideInLeft' : 'slideInRight',
            slideOut: rtl ? 'slideOutLeft' : 'slideOutRight',
            settings,
            bookmarks,
            header,
            footer,
        });
    },
};
</script>
