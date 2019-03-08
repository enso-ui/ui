<script>

import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Sidebar',

    computed: {
        ...mapState('menus', { menus: 'list' }),
    },

    watch: {
        $route() {
            this.refresh(this.menus);
        },
    },

    beforeMount() {
        this.refresh(this.menus);
    },

    methods: {
        ...mapMutations('menus', ['collapse', 'expand']),
        routeNameMatches({ route }) {
            return this.$route.matched
                .map(matchedRoute => matchedRoute.name)
                .includes(route);
        },
        routePathMatches({ route }) {
            return this.$route.matched.length > 1
                && this.$route.matched
                    .map(matchedRoute => matchedRoute.path)[this.$route.matched.length - 2]
                        === `/${route.split('.').slice(0, -1).join('/')}`;
        },
        isActive(menu) {
            return menu.route !== null
                && (this.routeNameMatches(menu) || this.routePathMatches(menu));
        },
        hasActiveChild(menu) {
            return menu.has_children && menu.children
                .some(child => this.isActive(child) || this.hasActiveChild(child));
        },
        refresh(menus) {
            menus.filter(menu => menu.expanded)
                .forEach((menu) => {
                    this.refresh(menu.children);

                    if (!this.hasActiveChild(menu)) {
                        this.collapse(menu);
                    }
                });

            const menu = menus.find(menu => this.hasActiveChild(menu));

            if (menu) {
                this.expand(menu);
                this.refresh(menu.children);
            }
        },
    },

    render() {
        return this.$scopedSlots.default({
            menus: this.menus,
            isActive: this.isActive,
        });
    },
};

</script>
