<script>
import { app } from '../../pinia/app';

export default {
    name: 'AppFooter',

    render() {
        return this.$slots.default({
            meta: app().meta,
        });
    },
};
</script>
