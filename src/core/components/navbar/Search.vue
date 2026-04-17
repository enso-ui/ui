<script>
import { layout } from '../../../pinia/layout';

export default {
    name: 'Search',

    inject: ['errorHandler', 'i18n', 'routerErrorHandler'],

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

    mounted() {
        document.addEventListener('keydown', this.keyDown);
    },

    unmounted() {
        document.removeEventListener('keydown', this.keyDown);
    },

    methods: {
        redirect(item, to = null) {
            if (!to && !item.routes.length) {
                return;
            }

            this.$router.push({
                name: to || item.routes[0].name,
                params: item.param,
            }).catch(this.routerErrorHandler);

            this.selectedTags = [];
            layout().hideNavbar();
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
            const { target, key, ctrlKey } = event;
            const visible = layout().navbar.isVisible;
            const hotkey = key => key === '/' || key === ' ' && ctrlKey;

            const shouldFocus = !visible && hotkey(key)
                && !['input', 'textarea'].includes(target.tagName.toLowerCase())
                && !target.isContentEditable;

            const shouldHide = visible && key === 'Escape';

            if (shouldFocus) {
                event.preventDefault();
                this.showSearch();
            }

            if (shouldHide) {
                event.preventDefault();
                layout().hideNavbar();
            }
        },
        showSearch() {
            layout().showNavbar();

            this.$nextTick(() => this.$el.nextElementSibling
                .querySelector('input').focus());
        },
        toggle(tag) {
            const index = this.selectedTags.indexOf(tag);

            if (index > -1) {
                this.selectedTags.splice(index, 1);
                return;
            }

            this.selectedTags.push(tag);
        },
    },
    render() {
        return this.$slots.default({
            bindings: {
                source: 'core.search.index',
                filter: this.filter,
                placeholder: this.i18n(this.labels.placeholder),
                searching: this.i18n(this.labels.searching),
                noResults: this.i18n(this.labels.noResults),
                errorHandler: this.errorHandler,
            },
            controlEvents: {
                click: event => {
                    this.showSearch();
                    event.stopPropagation();
                },
            },
            events: {
                selected: this.redirect,
            },
            hide: () => layout().hideNavbar(),
            isVisible: layout().navbar.isVisible,
            redirect: this.redirect,
            selected: tag => this.selectedTags.includes(tag),
            toggle: this.toggle,
            tags: this.tags,
        });
    },
};
</script>
