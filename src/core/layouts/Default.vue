<script>
import {
    mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';

export default {
    name: 'Default',

    inject: ['errorHandler'],

    computed: {
        ...mapState(['meta', 'appState']),
        ...mapState('layout', ['lightsOff', 'isTablet', 'isMobile', 'menu', 'settingsBar']),
        ...mapGetters('preferences', ['bookmarks', 'rtlClass', 'isRTL']),
        slideIn() {
            return this.isRTL ? 'slideInLeft' : 'slideInRight'
        },
        slideOut() {
            return this.isRTL ? 'slideOutLeft' : 'slideOutRight'
        },
    },

    watch: {
        isTablet: {
            handler() {
                return this.isTablet
                    ? this.hideMenu()
                    : this.showMenu();
            },
        },
    },

    created() {
        this.$root.$on('start-impersonating', this.startImpersonating);
        this.$root.$on('stop-impersonating', this.stopImpersonating);
    },

    beforeMount() {
        this.addTouchBreakpointsListeners();
    },

    methods: {
        ...mapMutations('layout', ['setIsTablet', 'setIsMobile', 'setIsTouch']),
        ...mapMutations('layout/menu', { showMenu: 'show', hideMenu: 'hide' }),
        ...mapActions(['loadAppState']),
        addTouchBreakpointsListeners() {
            const { body } = document;
            const TabletMaxWidth = 1023;
            const MobileMaxWidth = 768;

            const handler = () => {
                if (!document.hidden) {
                    const rect = body.getBoundingClientRect();
                    this.setIsTablet(rect.width <= TabletMaxWidth);
                    this.setIsMobile(rect.width <= MobileMaxWidth);
                    this.setIsTouch(
                        rect.width <= TabletMaxWidth || rect.width <= MobileMaxWidth,
                    );
                }
            };

            document.addEventListener('visibilitychange', handler);
            window.addEventListener('DOMContentLoaded', handler);
            window.addEventListener('resize', handler);

            this.$once('hook:destroyed', () => {
                document.removeEventListener('visibilitychange', handler);
                window.removeEventListener('DOMContentLoaded', handler);
                window.removeEventListener('resize', handler);
            });

            handler();
        },
        startImpersonating(id) {
            axios.get(route('core.impersonate.start', id))
                .then(({ data }) => {
                    this.$toastr.warning(data.message);
                    this.loadAppState();
                }).catch(this.errorHandler);
        },
        stopImpersonating() {
            axios.get(route('core.impersonate.stop'))
                .then(({ data }) => {
                    this.$toastr.info(data.message);
                    this.loadAppState();
                }).catch(this.errorHandler);
        },
    },

    render() {
        return this.$scopedSlots.default({
            appState: this.appState,
            lightsOff: this.lightsOff,
            menu: this.menu,
            rtlClass: this.rtlClass,
            isRTL: this.isRTL,
            slideIn: this.slideIn,
            slideOut: this.slideOut,
            settingsBar: this.settingsBar,
            bookmarks: this.bookmarks,
        });
    },
};
</script>
