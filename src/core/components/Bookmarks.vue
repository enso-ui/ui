<script>
export default {
    name: 'Bookmarks',

    props: {
        excluded: {
            type: Array,
            default: () => (['notFound', 'unauthorized']),
        },
    },

    data: () => ({
        scrollInterval: null,
        scrollStep: 5,
        bookmarks: [],
    }),

    computed: {
        container() {
            return this.$el.querySelector('.bookmark-items');
        },
        elements() {
            return this.container.querySelectorAll('.control');
        },
        stickies() {
            return this.bookmarks.filter(({ sticky }) => sticky);
        },
    },

    watch: {
        $route(bookmark) {
            this.push(bookmark);
        },
    },

    created() {
        const bookmarks = localStorage.getItem('bookmarks');
        this.bookmarks = bookmarks && JSON.parse(bookmarks) || [];
        this.push(this.$route);
    },

    methods: {
        push(bookmark) {
            this.bookmarks = this.bookmarks.filter(({ sticky }) => sticky);

            if (this.shouldPush(bookmark)) {
                this.bookmarks.push(this.map(bookmark));
                this.$nextTick(this.focus);
            }
        },
        shouldPush(bookmark) {
            return bookmark.name
                && this.bookmarks.findIndex(({ name }) => name === bookmark.name) === -1
                && !bookmark.meta.guestGuard;
        },
        map(bookmark) {
            return {
                name: bookmark.name,
                meta: bookmark.meta,
                params: bookmark.params,
                query: bookmark.query,
                sticky: false,
            };
        },
        remove(bookmark) {
            const index = this.bookmarks
                .findIndex(({ name }) => name === bookmark.name);

            this.bookmarks.splice(index, 1);

            if (bookmark.name === this.$route.name) {
                const { name, params } = this.bookmarks[this.bookmarks.length - 1];
                this.$router.push({ name, params });
            }
        },
        stick(bookmark) {
            const index = this.bookmarks
                .findIndex(({ name }) => name === bookmark.name);
            this.bookmarks[index].sticky = true;
            this.updateLocalStorage();
        },
        unStick(bookmark) {
            const index = this.bookmarks
                .findIndex(({ name }) => name === bookmark.name);
            this.bookmarks[index].sticky = false;
        },
        clear() {
            this.bookmarks
                .filter(({ name }) => name !== this.$route.name)
                .forEach(bookmark => this.remove(bookmark));

            this.bookmarks.forEach(bookmark => this.unStick(bookmark));

            this.updateLocalStorage();
        },
        focus() {
            clearInterval(this.scrollInterval);

            const bookmark = this.bookmarks
                .find(({ name }) => name === this.$route.name);

            const containerLeft = this.container.scrollLeft;
            const containerRight = containerLeft + this.container.clientWidth;
            const bookmarkLeft = bookmark.offsetLeft;
            const bookmarkRight = bookmarkLeft + bookmark.clientWidth;

            if (bookmarkLeft < containerLeft) {
                const remaining = (containerLeft - bookmarkLeft) % this.scrollStep;
                this.scroll(bookmarkLeft, -1, remaining);
            }

            if (bookmarkRight > containerRight) {
                const amount = bookmarkRight - containerRight;
                const remaining = amount % this.scrollStep;
                this.scroll(amount, 1, remaining);
            }
        },
        scroll(amount, direction, remaining) {
            if (remaining) {
                this.container.scrollLeft += remaining * direction;
            }

            this.scrollInterval = setInterval(() => {
                if (this.container.scrollLeft === amount) {
                    clearInterval(this.scrollInterval);
                    return;
                }

                this.container.scrollLeft += this.scrollStep * direction;
            }, 1);
        },
        isExcluded(bookmark) {
            return this.excluded.includes(bookmark.name);
        },
        updateLocalStorage() {
            localStorage.setItem('bookmarks', JSON.stringify(this.stickies));
        },
        reorder(bookmarks) {
            this.bookmarks = bookmarks;
        },
    },

    render() {
        return this.$scopedSlots.default({
            bookmarks: this.bookmarks,
            stickies: this.stickies,
            reorder: this.reorder,
            remove: this.remove,
            stick: this.stick,
            clear: this.clear,
            isExcluded: this.isExcluded,
            reorderBindings: {
                value: this.bookmarks,
            },
            reorderEvents: {
                input: bookmarks => (this.bookmarks = bookmarks),
            },
        });
    },
};
</script>
