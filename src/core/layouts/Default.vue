<script>
import {
    mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import eventBus from '../services/eventBus';

export default {
    name: 'Default',

    inject: ['errorHandler', 'route', 'toastr'],

    computed: {
        ...mapState(['meta', 'appState']),
        ...mapState('layout', ['isTablet', 'isMobile', 'sidebar', 'settings', 'footer']),
        ...mapGetters('preferences', ['bookmarks']),
        ...mapGetters('localisation', ['rtl']),
        slideIn() {
            return this.rtl ? 'slideInLeft' : 'slideInRight';
        },
        slideOut() {
            return this.rtl ? 'slideOutLeft' : 'slideOutRight';
        },
    },

    watch: {
        isTablet: {
            updateTouchMode() {
                return this.isTablet
                    ? this.hideSidebar()
                    : this.showSidebar();
            },
        },
    },

    created() {
        eventBus.$on('start-impersonating', this.startImpersonating);
        eventBus.$on('stop-impersonating', this.stopImpersonating);
    },

    beforeMount() {
        this.addTouchBreakpointsListeners();
        this.updateTouchMode();
    },

    unmounted() {
        this.removeTouchBreakpointsListeners();
    },

    methods: {
        ...mapMutations('layout', ['setIsTablet', 'setIsMobile', 'setIsTouch']),
        ...mapMutations('layout/sidebar', { showSidebar: 'show', hideSidebar: 'hide' }),
        ...mapActions(['loadAppState']),
        addTouchBreakpointsListeners() {
            document.addEventListener('visibilitychange', this.updateTouchMode);
            window.addEventListener('DOMContentLoaded', this.updateTouchMode);
            window.addEventListener('resize', this.updateTouchMode);
        },
        updateTouchMode() {
            const TabletMaxWidth = 1023;
            const MobileMaxWidth = 768;

            if (!document.hidden) {
                const rect = document.body.getBoundingClientRect();
                this.setIsTablet(rect.width <= TabletMaxWidth);
                this.setIsMobile(rect.width <= MobileMaxWidth);
                this.setIsTouch(
                    rect.width <= TabletMaxWidth || rect.width <= MobileMaxWidth,
                );
            }
        },
        removeTouchBreakpointsListeners() {
            document.removeEventListener('visibilitychange', this.updateTouchMode);
            window.removeEventListener('DOMContentLoaded', this.updateTouchMode);
            window.removeEventListener('resize', this.updateTouchMode);
        },
        startImpersonating(id) {
            axios.get(this.route('core.impersonate.start', id))
                .then(({ data }) => {
                    this.toastr.warning(data.message);
                    this.loadAppState();
                }).catch(this.errorHandler);
        },
        stopImpersonating() {
            axios.get(this.route('core.impersonate.stop'))
                .then(({ data }) => {
                    this.toastr.info(data.message);
                    this.loadAppState();
                }).catch(this.errorHandler);
        },
    },

    render() {
        return this.$slots.default({
            appState: this.appState,
            lightsOff: this.lightsOff,
            sidebar: this.sidebar,
            rtl: this.rtl,
            slideIn: this.slideIn,
            slideOut: this.slideOut,
            settings: this.settings,
            bookmarks: this.bookmarks,
            footer: this.footer,
        });
    },
};
</script>
