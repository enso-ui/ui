<script>
import { mapGetters, mapActions } from 'vuex';
import { positions } from '@enso-ui/toastr/config';

export default {
    name: 'ToastrPosition',

    inject: ['toastr'],

    data: () => ({
        positions,
    }),

    computed: {
        ...mapGetters('preferences', ['toastrPosition']),
    },

    created() {
        if (this.toastrPosition) {
            this.toastr.defaults({ position: this.toastrPosition });
            this.$toastr.defaults({ position: this.toastrPosition });
        }
    },

    methods: {
        ...mapActions('preferences', ['setToastrPosition']),
        update(position) {
            this.setToastrPosition(position);
            this.toastr.defaults({ position });
            this.$toastr.defaults({ position });
        },
    },

    render() {
        return this.$scopedSlots.default({
            toastrPosition: this.toastrPosition,
            positions: this.positions,
            update: this.update,
        });
    },
};

</script>
