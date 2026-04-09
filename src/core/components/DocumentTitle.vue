<script>
import { app } from '../../pinia/app';
import { preferences } from '../../pinia/preferences';

export default {
    name: 'DocumentTitle',

    inject: ['i18n'],

    computed: {
        meta() {
            return app().meta;
        },
        lang() {
            return preferences().global.lang;
        },
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
