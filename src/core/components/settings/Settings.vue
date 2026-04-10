<script>
import App from '../../app';
import { app } from '../../../pinia/app';

export default {
    name: 'Settings',

    render() {
        const routes = Object.keys(app().routes);
        const items = [...App.settingsItems].sort((a, b) => a.order - b.order)
            .filter(({ permission }) => !permission || routes.includes(permission));

        return this.$slots.default({
            items,
        });
    },
};
</script>
