<script>
import { layout } from '../../../pinia/layout';

export default {
    name: 'SettingsControl',

    render() {
        return this.$slots.default({
            toggle: () => layout().toggleSettings(),
        });
    },
};
</script>
