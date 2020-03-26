<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'ProfileControl',

    inject: ['route'],

    computed: {
        ...mapState(['user']),
        ...mapState('layout', ['isTouch']),
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
            avatarLink: this.route('core.avatars.show', this.user.avatar.id),
        });
    },
};
</script>
