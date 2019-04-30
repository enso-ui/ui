<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'ThemeSelector',

    computed: {
        ...mapState('layout', ['themes']),
        ...mapGetters('preferences', ['theme']),
        ...mapGetters('localisation', ['rtl']),
        alternate() {
            return Object.keys(this.themes)
                .find(theme => theme.replace('-rtl', '') !== this.theme.replace('-rtl', '')) + (this.rtl ? '-rtl' : '');
        },
    },

    methods: {
        ...mapActions('preferences', ['setTheme']),
    },

    render() {
        return this.$scopedSlots.default({
            itemEvents: {
                click: () => this.setTheme(this.alternate),
            },
        });
    },
};

</script>
