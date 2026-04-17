<script>
import { app } from '../../pinia/app';

export default {
    name: 'PageHeader',

    created() {
        const title = this.$route.meta?.title;

        if (title) {
            app().setPageTitle(title);
        }
    },

    render() {
        return this.$slots.default({
            pageTitle: app().meta.pageTitle,
        });
    },
};
</script>
