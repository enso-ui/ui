<template>
    <div class="calendar-wrapper box is-paddingless raises-on-hover">
        <vue-cal :time-from="7 * 60"
            :locale="lang === 'ar' ? 'en' : lang"
            :events="events"
            show-all-day-events
            :disable-views="['years']"
            v-bind="$attrs"
            @event-mouse-enter="hovering = $event.id"
            @event-mouse-leave="hovering = null"
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
                            {{ event.startTime }} <fa icon="arrows-alt-h"/> {{ event.endTime }}
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

    computed: {
        ...mapState(['enums']),
        ...mapGetters('preferences', ['lang']),
    },
};
</script>

<style lang="scss">
    .calendar-wrapper {
        .vuecal {
            @media screen and (min-width: 1024px) {
                min-height: 800px;
            }
            @media screen and (max-width: 1023px) {
                min-height: 500px;
            }

            height: auto;
            box-shadow: unset;
            border-radius: inherit;

            .vuecal__cell:hover {
                cursor: pointer;
            }

            .vuecal__all-day {
                max-height: 4em;
            }

            .week-view, .month-view {
                height: 680px;
            }

            .vuecal__cells.month-view {
                height: 110px;
            }

            .vuecal__cells.year-view {
                height: 170px;
            }
        }

        .vuecal__menu, .vuecal__cell-events-count {
            background-color: #42b983;
        }

        .vuecal__menu li {
            border-bottom-color: #fff;
            color: #fff;

            &.active {
                background-color: rgba(255, 255, 255, 0.15);
            }
        }

        .vuecal__title {
            background-color: #e4f5ef;
        }

        .vuecal__cell.today, .vuecal__cell.current {
            background-color: rgba(240, 240, 255, 0.4);
        }

        .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {
            background-color: rgba(235, 255, 245, 0.4);
        }

        .vuecal__cell.selected:before {
            border-color: rgba(66, 185, 131, 0.5);
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
