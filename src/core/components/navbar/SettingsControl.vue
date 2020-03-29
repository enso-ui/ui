<script>
import { mapMutations } from 'vuex';

export default {
    name: 'SettingsControl',

    methods: {
        ...mapMutations('layout/settings', ['toggle']),
    },

    render() {
        return this.$scopedSlots.default({
            toggle: this.toggle,
        });
    },
};
</script>
