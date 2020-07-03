<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'MissingKeys',

    inject: ['errorHandler', 'route', 'toastr'],

    data: () => ({
        hover: false,
    }),

    computed: {
        ...mapState('localisation', ['keyCollector', 'missingKeys']),
        count() {
            return this.missingKeys.length;
        },
        mappedKeys() {
            return this.missingKeys
                .map(key => ({ [key]: null }));
        },
    },

    methods: {
        ...mapMutations('localisation', ['addKey', 'clearMissingKeys']),
        persist() {
            axios.patch(
                this.route('system.localisation.addKey'),
                { keys: this.missingKeys },
            ).then(({ data }) => {
                this.missingKeys.forEach(key => this.addKey(key));
                this.clearMissingKeys();
                this.toastr.success(data.message);
            }).catch(this.errorHandler);
        },
    },

    render() {
        return this.$scopedSlots.default({
            keyCollector: this.keyCollector,
            hover: this.hover,
            count: this.count,
            events: {
                click: this.persist,
                mouseenter: () => (this.hover = true),
                mouseleave: () => (this.hover = false),
            },
        });
    },
};
</script>
