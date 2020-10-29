<script>
import debounce from 'lodash/debounce';
import {
    mapState, mapGetters, mapActions,
} from 'vuex';
import format from '../../../modules/plugins/date-fns/format';

export default {
    name: 'Tasks',

    inject: ['errorHandler', 'route', 'toastr'],

    props: {
        paginate: {
            type: Number,
            default: 200,
        },
    },

    data: () => ({
        tasks: [],
        overdue: 0,
        pending: 0,
        offset: 0,
        loading: false,
        echo: null,
        visible: false,
    }),

    computed: {
        ...mapGetters('websockets', ['taskChannel']),
        ...mapState('layout', ['isTouch']),
        ...mapState(['enums', 'meta']),
    },

    created() {
        this.fetch = debounce(this.fetch, 500);
        this.count();
        this.connect();
        this.listen();
    },

    methods: {
        ...mapActions('websockets', ['connect']),
        toggle() {
            this.visible = !this.visible;

            if (this.visible) {
                this.fetch();
            }
        },
        hide() {
            this.visible = false;
        },
        count() {
            axios.get(this.route('tasks.count'))
                .then(({ data: { overdueCount, pendingCount } }) => {
                    this.overdue = overdueCount;
                    this.pending = pendingCount;
                })
                .catch(this.errorHandler);
        },
        fetch() {
            if (this.loading) {
                return;
            }

            this.loading = true;

            axios.get(this.route('tasks.index'), {
                params: { offset: this.offset, paginate: this.paginate },
            }).then(({ data }) => {
                this.tasks = this.offset ? this.tasks.concat(data) : data;
                this.offset = this.tasks.length;
                this.loading = false;
            }).catch(this.errorHandler);
        },
        listen() {
            window.Echo.private(this.taskChannel)
                .listen('.tasks-changed', ({ overdueCount, pendingCount }) => {
                    this.overdue = overdueCount;
                    this.pending = pendingCount;
                });
        },
        computeScrollPosition(event) {
            const a = event.target.scrollTop;
            const b = event.target.scrollHeight - event.target.clientHeight;

            if (a / b > 0.7) {
                this.fetch();
            }
        },
        flagClass(id) {
            return `has-text-${this.enums.flags._get(id).toLowerCase()}`;
        },
        dateTime(dateTime) {
            return format(dateTime, `${this.meta.dateFormat} H:i`);
        },
    },

    render() {
        return this.$scopedSlots.default({
            tasks: this.tasks,
            loading: this.loading,
            isTouch: this.isTouch,
            visible: this.visible,
            pending: this.pending,
            overdue: this.overdue,
            toggle: this.toggle,
            hide: this.hide,
            flagClass: this.flagClass,
            dateTime: this.dateTime,
            tasksEvents: {
                scroll: e => this.computeScrollPosition(e),
            },
        });
    },
};
</script>
