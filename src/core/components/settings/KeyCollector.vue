<script>
import { mapMutations } from 'vuex';

export default {
    name: 'KeyCollector',

    data: () => ({
        collect: false,
    }),

    methods: {
        ...mapMutations('localisation', ['setKeyCollector']),
    },

    render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.collect,
            },
            events: {
                input: (state) => {
                    this.collect = state;
                    this.setKeyCollector(state);
                },
            },
        });
    },
};

</script>
