<script>
import { mapMutations } from 'vuex';

export default {
    name: 'SettingsControl',

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
