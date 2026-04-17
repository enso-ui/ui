<script>
import { loader } from '../../pinia/loader';

export default {
    name: 'Loader',

    render() {
        const state = loader();

        return this.$slots.default({
            visible: state.visible,
            progress: state.progress,
        });
    },
};
</script>
