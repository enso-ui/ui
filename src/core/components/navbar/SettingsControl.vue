<script>
import { mapMutations } from 'vuex';

export default {
    name: 'SettingsControl',

    methods: {
        ...mapMutations('layout/settings', ['toggle']),
    },

    render() {
        return this.$slots.default({
            toggle: this.toggle,
        });
    },
};
</script>
