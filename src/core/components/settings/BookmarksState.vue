<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'BookmarksState',

    computed: {
        ...mapGetters('preferences', ['bookmarks']),
    },

    methods: {
        ...mapActions('preferences', ['setBookmarksState']),
    },

    render() {
        return this.$scopedSlots.default({
            bindings: {
                value: this.bookmarks,
            },
            events: {
                input: state => this.setBookmarksState(state),
            },
        });
    },
};

</script>
