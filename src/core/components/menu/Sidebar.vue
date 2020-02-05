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
        nameMatches({ route }) {
            return this.$route.matched
                .map(matchedRoute => matchedRoute.name)
                .includes(route);
        },
        pathMatches({ route }) {
            const path = `/${route.split('.').slice(0, -1).join('/')}`;

            return this.$route.matched
                .map(matchedRoute => matchedRoute.path)
                .includes(path);
        },
        isActive(menu) {
            return menu.route !== null
                && (this.nameMatches(menu) || this.pathMatches(menu));
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
