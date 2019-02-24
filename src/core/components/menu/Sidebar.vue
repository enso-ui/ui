<script>

import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState('menus', { menus: 'list' }),
    },

    watch: {
        $route() {
            this.refresh();
        },
    },

    beforeMount() {
        this.refresh();
    },

    methods: {
        ...mapActions('menus', ['refresh']),
    },

    render() {
        return this.$scopedSlots.default({
            menus: this.menus,
        });
    },
};

</script>
