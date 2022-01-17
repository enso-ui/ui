<script>
import { mapState, mapGetters } from 'vuex';
import App from '../../app';

export default {
    name: 'Settings',

    computed: {
        ...mapState(['user']),
        ...mapState(['meta']),
        ...mapState('layout', ['themes']),
        ...mapState('localisation', ['languages']),
        ...mapGetters(['routes']),
        multiTheme() {
            return Object.keys(this.themes).length > 1;
        },
        items() {
            return App.settingsItems.sort((a, b) => a.order - b.order)
                .filter(({ permission }) => !permission
                    || this.routes.includes(permission));;
        },
    },

    render() {
        return this.$slots.default({
            multiTheme: this.multiTheme,
            meta: this.meta,
            items: this.items,
        });
    },
};
</script>
