<script>
import { mapState, mapMutations } from 'vuex';

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
        ...mapState('layout/search', ['isVisible']),
    },

    mounted() {
        this.addShortcut();
    },

    methods: {
        ...mapMutations('layout/search', ['show', 'hide']),
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
        keyDown(event) {
            const { target, key } = event;

            const shouldFocus = !this.isVisible && key === '/'
                && !['input', 'textarea'].includes(target.tagName.toLowerCase())
                && !target.isContentEditable;

            const shouldHide = this.isVisible && key === 'Escape';

            if (shouldFocus) {
                event.preventDefault();
                this.showSearch();
            }

            if (shouldHide) {
                event.preventDefault();
                this.blur();
            }
        },
        blur() {
            this.$el.querySelector('input').removeEventListener('blur', this.blur);
            setTimeout(() => this.hide(), 200);
        },
        showSearch() {
            this.show();

            this.$nextTick(() => {
                const input = this.$el.querySelector('input');
                input.addEventListener('blur', this.blur);
                input.focus();
            });
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
        addShortcut() {
            document.addEventListener('keydown', this.keyDown);
            const input = this.$el.querySelector('input');

            this.$once('hook:destroyed', () => {
                document.removeEventListener('keydown', this.keyDown);
            });
        },
    },
    render() {
        return this.$scopedSlots.default({
            bindings: {
                source: 'core.search.index',
                filter: this.filter,
                placeholder: this.i18n(this.labels.placeholder),
                searching: this.i18n(this.labels.searching),
                noResults: this.i18n(this.labels.noResults),
                errorHandler: this.errorHandler,
            },
            controlEvents: {
                click: this.showSearch,
            },
            events: {
                selected: this.redirect,
            },
            isVisible: this.isVisible,
            redirect: this.redirect,
            toggle: this.toggle,
            selected: this.selected,
            tags: this.tags,
        });
    },
};
</script>
