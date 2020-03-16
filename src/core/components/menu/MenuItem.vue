<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'MenuItem',

    props: {
        menu: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapState('layout/menu', ['isExpanded']),
        ...mapState('layout', ['isTouch']),
    },

    methods: {
        ...mapMutations('layout/menu', ['hide']),
        ...mapMutations('menus', ['toggle']),
        select() {
            if (this.menu.hasChildren) {
                this.toggle(this.menu);

                return;
            }

            if (this.$route.name !== this.menu.route) {
                this.$router.push({ name: this.menu.route });
            }

            if (this.isTouch) {
                this.hide();
            }
        },
    },

    render() {
        return this.$scopedSlots.default({
            menu: this.menu,
            expandedMenu: this.isExpanded,
            menuEvents: {
                click: this.select,
            },
        });
    },
};
</script>
