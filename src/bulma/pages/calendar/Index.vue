<template>
    <div class="events-wrapper">
        <div class="columns">
            <div class="column is-3-desktop is-8-tablet is-12-mobile">
                <enso-select v-model="calendar"
                    :options="enums.calendars._select()"
                    placeholder="Calendar"
                    @input="fetch"/>
            </div>
        </div>
        <enso-calendar :events="filteredEvents"
            :on-event-dblclick="selectEvent"
            @ready="updateInterval"
            @view-change="updateInterval"
            @event-duration-change="update"
            @event-delete="destroy"
            @add-event="event = $event || {}"/>
        <event-form :event="event"
            @submit="submit"
            @close="event = null"
            @destroy="remove(event); event = null"
            v-if="event"/>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { EnsoSelect } from '@enso-ui/bulma';
import EnsoCalendar from './components/EnsoCalendar.vue';
import EventForm from './components/EventForm.vue';

export default {
    name: 'Index',

    components: { EnsoCalendar, EventForm, EnsoSelect },

    inject: ['errorHandler', 'route'],

    data: () => ({
        calendar: '1',
        event: null,
        events: [],
        interval: null,
    }),

    computed: {
        ...mapState(['enums']),
        params() {
            if (!this.interval) {
                return { calendar: this.calendar };
            }

            return this.interval.view === 'month'
                ? { calendar: this.calendar, startDate: this.interval.firstCellDate, endDate: this.interval.lastCellDate }
                : { calendar: this.calendar, startDate: this.interval.startDate, endDate: this.interval.endDate };
        },
        filteredEvents() {
            return this.events.filter(event => this.calendar === event.calendar);
        },
    },

    created() {
        this.hideFooter();
    },

    mounted() {
        this.resize();

        window.addEventListener('resize', this.resize);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.resize);

        this.showFooter();
    },

    methods: {
        ...mapMutations('layout', ['showFooter', 'hideFooter']),
        fetch() {
            axios.get(this.route('core.calendar.events.index'), { params: this.params })
                .then(({ data }) => (this.events = data))
                .catch(this.errorHandler);
        },
        selectEvent(event, e) {
            if (!event.readonly) {
                this.event = event;
            }
            e.stopPropagation();
        },
        submit({ event }) {
            if (this.event.id) {
                const index = this.events.findIndex(({ id }) => id === event.id);
                this.events.splice(index, 1, event);
            } else {
                this.events.push(event);
            }

            this.event = null;
        },
        update($event) {
            axios.patch(
                this.route('core.calendar.events.update', { event: $event.id }),
                { starts_at: $event.start, ends_at: $event.end },
            ).catch(this.errorHandler);
        },
        destroy($event) {
            if ($event.readonly) {
                return;
            }

            axios.delete(
                this.route('core.calendar.events.destroy', { event: $event.id }),
            ).then(() => (this.remove($event)))
                .catch(this.errorHandler);
        },
        remove(event) {
            const index = this.events.findIndex(({ id }) => id === event.id);
            this.events.splice(index, 1);
        },
        updateInterval(interval) {
            this.interval = interval;
            this.fetch();
        },
        resize() {
            this.$el.style.height = `${document.body.clientHeight - 270}px`;
        },
    },
};
</script>
