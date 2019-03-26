<template>
    <div class="events-wrapper">
        <enso-calendar :events="events"
            :on-event-dblclick="selectEvent"
            @ready="updateInterval"
            @view-change="updateInterval"
            @event-duration-change="update"
            @event-delete="destroy"
            @add-event="event = {}"/>
        <event-form :event="event"
            @submit="submit"
            @close="event = null"
            @destroy="remove(event); event = null"
            v-if="event"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import EnsoCalendar from './components/EnsoCalendar.vue';
import EventForm from './components/EventForm.vue';

export default {
    name: 'Index',

    components: { EnsoCalendar, EventForm },

    inject: ['errorHandler'],

    data: () => ({
        event: null,
        calendars: [],
        events: [],
        interval: null,
    }),

    computed: {
        ...mapState(['enums']),
        params() {
            if (!this.interval) {
                return {};
            }

            return this.interval.view === 'month'
                ? { startDate: this.interval.firstCellDate, endDate: this.interval.lastCellDate }
                : { startDate: this.interval.startDate, endDate: this.interval.endDate };
        },
        filteredEvents() {
            return this.events.filter(event => this.calendars
                .includes(event.calendar));
        },
    },

    methods: {
        fetch() {
            axios.get(route('core.calendar.events.index'), { params: this.params })
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
                route('core.calendar.events.update', { event: $event.id }),
                { starts_at: $event.start, ends_at: $event.end },
            ).catch(this.errorHandler);
        },
        destroy($event) {
            if ($event.readonly) {
                return;
            }

            axios.delete(
                route('core.calendar.events.destroy', { event: $event.id }),
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
    },
};
</script>
