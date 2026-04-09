<script>
import { layout } from '../../pinia/layout';

export default {
    name: 'SettingsControl',

    methods: {
        toggle() {
            layout().toggleSettings();
        },
    },

    render() {
        return this.$slots.default({
            toggle: this.toggle,
        });
    },
};
</script>
