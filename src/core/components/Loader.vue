<script>
import { loader } from '../../pinia/loader';

export default {
    name: 'Loader',

    computed: {
        visible() {
            return loader().visible;
        },
        progress() {
            return loader().progress;
        },
    },

    render() {
        return this.$slots.default({
            visible: this.visible,
            progress: this.progress,
        });
    },
};
</script>
