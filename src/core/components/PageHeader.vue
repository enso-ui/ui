<script>
import { app } from '../../pinia/app';

export default {
    name: 'PageHeader',

    computed: {
        meta() {
            return app().meta;
        },
    },

    created() {
        if (this.$route.meta && this.$route.meta.title) {
            this.setPageTitle(this.$route.meta.title);
        }
    },

    methods: {
        setPageTitle(title) {
            app().setPageTitle(title);
        },
    },

    render() {
        return this.$slots.default({
            pageTitle: this.meta.pageTitle,
        });
    },
};
</script>
