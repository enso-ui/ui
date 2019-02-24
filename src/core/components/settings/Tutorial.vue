<script>
import { mapMutations } from 'vuex';
import Driver from 'driver.js';

export default {
    props: {
        labels: {
            type: Object,
            default: () => ({
                done: 'Done',
                close: 'Close',
                next: 'Next',
                previous: 'Previous',
            }),
        },
    },

    data: v => ({
        driver: new Driver({
            doneBtnText: v.__(v.labels.done),
            closeBtnText: v.__(v.labels.close),
            nextBtnText: v.__(v.labels.next),
            prevBtnText: v.__(v.labels.previous),
        }),
    }),

    methods: {
        ...mapMutations('layout/settingsBar', { toggleSettingsBar: 'toggle' }),
        fetch() {
            axios.get(route('system.tutorials.show'), {
                params: { route: this.$route.name },
            }).then(({ data }) => this.start(data))
                .catch(error => this.handleError(error));
        },
        start(steps) {
            if (!steps.length) {
                return;
            }

            this.toggleSettingsBar();
            this.driver.defineSteps(this.localise(steps));
            this.driver.start();
        },
        localise(steps) {
            return steps.map(({ element, popover }) => ({
                element,
                popover: {
                    description: this.__(popover.description),
                    position: popover.position,
                    title: this.__(popover.title),
                },
            }));
        },
    },

    render() {
        return this.$scopedSlots.default({
            itemEvents: {
                click: this.fetch,
            },
        });
    },
};
</script>

<style lang="scss">
    @import '~driver.js/dist/driver.min.css';
</style>
