<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'PageHeader',

    computed: {
        ...mapState(['meta']),
    },

    created() {
        if (this.$route.meta && this.$route.meta.title) {
            this.setPageTitle(this.$route.meta.title);
        }
    },

    methods: {
        ...mapMutations(['setPageTitle']),
    },

    render() {
        return this.$slots.default({
            pageTitle: this.meta.pageTitle,
        });
    },
};
</script>
