<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters('preferences', ['expandedMenu']),
    },

    methods: {
        ...mapActions('preferences', ['setMenuState']),
    },

    render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.expandedMenu,
            },
            events: {
                input: state => (this.setMenuState(state)),
            },
        });
    },
};

</script>
