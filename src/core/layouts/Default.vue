<script>
import eventBus from '../services/eventBus';
import { useStore } from '../services/pinia';
import { layout as useLayout } from '../../pinia/layout';
import { preferences as usePreferences } from '../../pinia/preferences';
import { loadAppState } from '../../modules/loadState';

export default {
    name: 'Default',

    inject: ['errorHandler', 'http', 'route', 'toastr'],

    data: () => ({
        appState: false,
    }),

    computed: {
        isTablet() {
            return useLayout().isTablet;
        },
    },

    methods: {
        rtl() {
            const localisation = useStore('localisation');
            const lang = usePreferences().global.lang;
            const rtl = localisation?.rtlLanguages ?? [];

            return rtl.includes(lang);
        },
        setIsTablet(value) {
            useLayout().setIsTablet(value);
        },
        setIsMobile(value) {
            useLayout().setIsMobile(value);
        },
        setIsTouch(value) {
            useLayout().setIsTouch(value);
        },
        showSidebar() {
            useLayout().showSidebar();
        },
        hideSidebar() {
            useLayout().hideSidebar();
        },
        async bootstrap() {
            this.appState = false;

            const loaded = await loadAppState();

            if (!loaded) {
                return;
            }

            this.toastr.setup(usePreferences().global.toastrPosition);

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

            if (!document.hidden) {
                const width = window.visualViewport?.width
                    || document.documentElement.clientWidth
                    || window.innerWidth;
                this.setIsTablet(width <= TabletMaxWidth);
                this.setIsMobile(width <= MobileMaxWidth);
                this.setIsTouch(
                    width <= TabletMaxWidth || width <= MobileMaxWidth,
                );
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
                    this.bootstrap();
                }).catch(this.errorHandler);
        },
        stopImpersonating() {
            this.http.get(this.route('core.impersonate.stop'))
                .then(({ data }) => {
                    this.toastr.info(data.message);
                    this.bootstrap();
                }).catch(this.errorHandler);
        },
    },

    watch: {
        isTablet: {
            handler() {
                return this.isTablet
                    ? this.hideSidebar()
                    : this.showSidebar();
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

        const layout = useLayout();
        const preferences = usePreferences();
        const {
            header, sidebar, settings, footer,
        } = layout;
        const { bookmarks } = preferences.global;
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
