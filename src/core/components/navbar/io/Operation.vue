<script>
import formatDistance from '../../../../modules/plugins/date-fns/formatDistance';

export default {
    name: 'Operation',

    inject: ['route'],

    props: {
        operation: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            required: true,
            validator: val => ['in', 'out'].includes(val),
        },
    },

    computed: {
        isIn() {
            return this.type === 'in';
        },
        isOut() {
            return this.type === 'out';
        },
    },

    methods: {
        avatar({ id }) {
            return this.route('core.avatars.show', id);
        },
        since(since) {
            return formatDistance(since);
        },
    },

    render() {
        return this.$scopedSlots.default({
            operation: this.operation,
            since: this.since,
            isIn: this.isIn,
            avatar: this.avatar,
        });
    },
};
</script>
