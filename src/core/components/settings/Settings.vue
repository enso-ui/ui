<script>
import { mapState } from 'vuex';

export default {
    name: 'Settings',

    computed: {
        ...mapState(['user']),
        ...mapState(['meta']),
        ...mapState('layout', ['themes']),
        ...mapState('localisation', ['languages']),
        multiTheme() {
            return Object.keys(this.themes).length > 1;
        },
        multiLanguage() {
            return Object.keys(this.languages).length > 1;
        },
    },

    render() {
        return this.$scopedSlots.default({
            multiLanguage: this.multiLanguage,
            multiTheme: this.multiTheme,
            meta: this.meta,
        });
    },
};
</script>
