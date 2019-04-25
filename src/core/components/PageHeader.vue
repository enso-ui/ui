<script>
export default {
    name: 'PageHeader',

    data: () => ({
        routing: false,
    }),

    watch: {
        $route() {
            this.routing = true;
            setTimeout(() => {
                this.routing = false;
            }, 100);
        },
    },

    render() {
        return this.$scopedSlots.default({
            routing: this.routing,
        });
    },
};
</script>
