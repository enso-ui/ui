<script>
import { mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations('layout/settingsBar', ['toggle']),
    },

    render() {
        return this.$scopedSlots.default({
            toggle: this.toggle,
        });
    },
};
</script>
