<script>
import { mapState } from 'vuex';

export default {
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
        query: '',
        selectedTags: [],
    }),

    computed: {
        ...mapState(['appState']),
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
            if (this.value === '') {
                this.selectedTags = [];
            }

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
            inputBindings: {
                value: this.query,
                source: this.source,
                filter: this.filter,
                placeholder: this.__(this.labels.placeholder),
                searching: this.__(this.labels.searching),
                noResults: this.__(this.labels.noResults),
            },
            inputEvents: {
                input: e => (this.query = e),
                update: this.redirect,
            },
            redirect: this.redirect,
            toggle: this.toggle,
            selected: this.selected,
            tags: this.tags,
        });
    },
};
</script>
