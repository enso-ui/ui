<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState('localisation', ['languages']),
        ...mapGetters('preferences', ['lang']),
    },

    methods: {
        ...mapActions('preferences', ['setLang']),
    },

    render() {
        return this.$scopedSlots.default({
            locale: this.lang,
            languages: this.languages,
            itemEvents: {
                click: lang => (this.setLang(lang)),
            },
        });
    },
};

</script>
