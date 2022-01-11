<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'DocumentTitle',

    inject: ['i18n'],

    computed: {
        ...mapState(['meta']),
        ...mapGetters('preferences', ['lang']),
        documentTitle() {
            if (this.$route.name === 'notFound') {
                return '';
            }

            const { extendedDocumentTitle, appName } = this.meta;
            const { title } = this.$route.meta;

            return extendedDocumentTitle
                ? `${this.i18n(title)} | ${appName}`
                : this.i18n(title);
        },
    },

    watch: {
        lang: 'update',
        $route: {
            handler: 'update',
            deep: true,
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
