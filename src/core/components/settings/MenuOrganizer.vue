<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'MenuOrganizer',

    computed: {
        ...mapState('menu', ['editable']),
    },

    methods: {
        ...mapMutations('menu', ['edit']),
    },

    render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.editable,
            },
            events: {
                input: this.edit,
            },
        });
    },
};

</script>
