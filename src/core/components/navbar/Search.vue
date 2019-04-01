<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'Search',

    inject: ['errorHandler', 'i18n'],

    props: {
        labels: {
            type: Object,
            default: () => ({
                placeholder: 'Search something',
                searching: 'Searching...',
                noResults: 'Nothing found',
            }),
        },
    },

    data: () => ({
        selectedTags: [],
    }),

    computed: {
        ...mapState(['appState']),
        ...mapGetters('preferences', ['isRTL']),
        source() {
            return route('core.search.index');
        },
    },

    methods: {
        route(search, { routes }) {
            return routes.find(route => route.indexOf(search) >= 0);
        },
        redirect(item, to = null) {
            if (!to && !item.routes.length) {
                return;
            }
            this.$router.push({
                name: to || item.routes[0].name,
                params: item.param,
            });
            this.selectedTags = [];
        },
        tags(items) {
            return items.reduce((tags, { group }) => {
                if (!tags.includes(group)) {
                    tags.push(group);
                }
                return tags;
            }, []);
        },
        filter(items) {
            let filtered = this.filtered(items);

            if (!filtered.length && this.selectedTags.length) {
                this.selectedTags = [];
                filtered = this.filtered(items);
            }
            return filtered;
        },
        filtered(items) {
            return this.selectedTags.length
                ? items.filter(item => this.selectedTags.includes(item.group))
                : items;
        },
        toggle(tag) {
            const index = this.selectedTags.indexOf(tag);
            if (index > -1) {
                this.selectedTags.splice(index, 1);
                return;
            }
            this.selectedTags.push(tag);
        },
        selected(tag) {
            return this.selectedTags.includes(tag);
        },
    },
    render() {
        return this.$scopedSlots.default({
            bindings: {
                source: this.source,
                filter: this.filter,
                placeholder: this.i18n(this.labels.placeholder),
                searching: this.i18n(this.labels.searching),
                noResults: this.i18n(this.labels.noResults),
                errorHandler: this.errorHandler,
            },
            events: {
                selected: this.redirect,
            },
            redirect: this.redirect,
            toggle: this.toggle,
            selected: this.selected,
            tags: this.tags,
            isRTL: this.isRTL,
        });
    },
};
</script>
