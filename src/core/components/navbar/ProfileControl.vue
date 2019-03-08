<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'ProfileControl',

    computed: {
        ...mapState(['user']),
        ...mapState('layout', ['isTouch']),
        ...mapGetters(['avatarLink']),
    },

    methods: {
        visitProfile() {
            this.$router.push({
                name: 'administration.users.show',
                params: { user: this.user.id },
            });
        },
    },

    render() {
        return this.$scopedSlots.default({
            user: this.user,
            isTouch: this.isTouch,
            visitProfile: this.visitProfile,
            avatarLink: this.avatarLink,
        });
    },
};
</script>
