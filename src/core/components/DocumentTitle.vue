<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'DocumentTitle',

    computed: {
        ...mapState(['meta']),
        ...mapGetters('preferences', ['lang']),
        documentTitle() {
            const { extendedDocumentTitle, appName } = this.meta;
            const { title } = this.$route.meta;

            return extendedDocumentTitle
                ? `${this.__(title)} | ${appName}`
                : this.__(title);
        },
    },

    watch: {
        lang() {
            this.update();
        },
        $route() {
            this.update();
        },
    },

    methods: {
        update() {
            document.title = this.documentTitle;
        },
    },

    render() {
        return this.$slots.default;
    },
};
</script>
