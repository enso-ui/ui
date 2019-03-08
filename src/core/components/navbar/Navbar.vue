<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Navbar',

    computed: {
        ...mapState(['meta', 'impersonating']),
        ...mapState('layout', ['isMobile', 'isTouch', 'menu']),
    },

    methods: {
        ...mapMutations('layout/menu', { toggleMenu: 'toggle' }),
    },
    render() {
        return this.$scopedSlots.default({
            meta: this.meta,
            impersonating: this.impersonating,
            isMobile: this.isMobile,
            isTouch: this.isTouch,
            menu: this.menu,
            toggleMenu: this.toggleMenu,
        });
    },
};

</script>
