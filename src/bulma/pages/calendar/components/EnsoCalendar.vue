<template>
    <div class="calendar-wrapper box is-paddingless raises-on-hover">
        <vue-cal class="vuecal--green-theme"
            :time-from="7 * 60"
            :locale="lang"
            :events="events"
            show-all-day-events
            events-count-on-year-view
            v-bind="$attrs"
            @event-mouse-enter="hovering = $event.id"
            @event-mouse-leave="hovering = null"
            :on-event-create="addEvent"
            editable-events
            resize-x
            v-on="$listeners">
            <template v-slot:title="{ title, view }">
                <div>
                    {{ title }}
                    <a class="button is-primary is-small is-rounded has-margin-left-large"
                        @click.stop="$emit('add-event')">
                        <span class="is-bold">
                            {{ i18n('Add Event') }}
                        </span>
                        <span class="icon is-small">
                            <fa icon="plus"/>
                        </span>
                    </a>
                </div>
            </template>
            <template v-slot:event-renderer="{ event, view }">
                <div>
                    <b class="has-text-centered">
                        {{ event.title }}
                    </b>
                    <p class="event-body has-margin-bottom-small"
                        v-if="event.body"
                        v-html="event.body"/>
                    <div v-if="!event.allDay">
                        <p class="has-text-centered"
                            v-if="hovering === event.id">
                                {{ dateFormat(event.daysCount,event.start) }}
                                <fa icon="arrows-alt-h"/>
                                {{ dateFormat(event.daysCount,event.end) }}
                        </p>
                    </div>
                </div>
            </template>
        </vue-cal>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import VueCal from 'vue-cal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faFlag, faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

import 'vue-cal/dist/vuecal.css';
import format from '@core-modules/plugins/date-fns/format';

library.add(faPlus, faFlag, faArrowsAltH);

export default {
    name: 'EnsoCalendar',

    components: { VueCal },

    inject: ['i18n'],

    props: {
        events: {
            type: Array,
            required: true,
        },
    },

    data: () => ({
        event: null,
        hovering: null,
    }),

    methods: {
        addEvent(event, deleteFunction) {
            [event.startDate, event.startTime] = event.start.split(' ');
            [event.endDate, event.endTime] = event.end.split(' ');
            this.$emit('add-event', event);
        },
        dateFormat(daysCount,date) {
            if (daysCount > 1) {
                return format(date, 'm-d h:i');
            }

            return format(date, 'h:i');
        }
    },
    computed: {
        ...mapState(['enums']),
        ...mapGetters('preferences', ['lang']),
    },
};
</script>

<style lang="scss">
    .calendar-wrapper {
        .vuecal {
            border-radius: inherit;

            .vuecal__cell:hover {
                cursor: pointer;
            }

            .vuecal__all-day {
                max-height: 4em;
            }
        }

        .vuecal__event {
            .event-body {
                white-space: pre;
            }

            &.is-info {
                background-color: rgba(100,200,255,.8);
                border: 1px solid #50b4eb;
                color: #fff;
            }

            &.is-danger {
                background-color: rgba(231,76,60,.8);
                border: 1px solid #e74c3c;
                color: #fff;
            }

            &.is-warning {
                background-color: rgba(225,221,87,.8);
                border: 1px solid #ffdd57;
                color: #4a4a4a;
            }

            &.is-success {
                background-color: rgba(35,209,96,.8);
                border: 1px solid #23d160;
                color: #fff;
            }

            &.is-primary {
                background-color: rgba(164,230,210,.9);
                border: 1px solid #90d2be;
            }
        }

        .vuecal__event-resize-handle {
                &:after {
                    top: 5px;
                    left: calc(50% - 10px);
                }
                &:before {
                    top: 10px;
                    left: calc(50% - 10px);
                }
                &:after, &:before {
                    display: block;
                    content: "";
                    position: absolute;
                    width: 20px;
                    height: 2px;
                    transition-timing-function: ease;
                    transition-duration: .15s;
                    transition-property: transform;
                    border-radius: 4px;
                    background-color: #fff;
                }
            }
        .vuecal__time-column {
            height: auto;
        }
    }
</style>
