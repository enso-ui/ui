<template>
    <modal class="event-modal"
        show
        v-on="$listeners">
        <enso-form class="box has-background-light"
            :path="path"
            v-on="$listeners"
            ref="form"
            disable-state
            @ready="init">
            <template v-slot:starts_at="props">
                <form-field v-bind="props"
                    @input="
                        $refs.form.field('ends_at').meta.min = $event;
                        $refs.form.field('recurrence_ends_at').meta.min = $event;
                    "/>
            </template>
            <template v-slot:ends_at="props">
                <form-field v-bind="props"
                    @input="$refs.form.field('starts_at').meta.max = $event;"/>
            </template>
            <template v-slot:frequence="props">
                <form-field v-bind="props"
                    @input="$refs.form.field('recurrence_ends_at').meta.hidden = $event === 1"/>
            </template>
            <template v-slot:reminders="{ field }">
                <div class="field">
                    <label class="label">{{ i18n('Reminders') }}</label>
                    <div class="columns">
                        <div class="column is-3">
                            <fade>
                                <a class="button is-small is-naked has-margin-top-medium is-pulled-right"
                                    @click="field.value.push(reminderFactory())"
                                    v-if="
                                        field.value.length < 3
                                        && !field.value.some(({ remind_at }) => !remind_at)
                                    ">
                                    <span class="icon is-small">
                                        <fa icon="plus"/>
                                    </span>
                                    <span class="icon is-small">
                                        <fa icon="user-clock"/>
                                    </span>
                                </a>
                            </fade>
                        </div>
                        <div class="column">
                            <div class="columns"
                                v-for="(reminder, index) in field.value"
                                :key="index">
                                <div class="column is-9 animated fadeIn">
                                    <p class="has-margin-bottom-small">
                                        <enso-datepicker v-model="reminder.remind_at"
                                            v-bind="field.meta"/>
                                    </p>
                                </div>
                                <div class="column">
                                    <a class="button is-small is-naked has-margin-top-small"
                                        @click="field.value.splice(index, 1)">
                                        <span class="icon is-small">
                                            <fa icon="minus"/>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="has-text-centered has-margin-top-medium"
                                v-if="field.value.length === 0">
                                {{ i18n('No reminders yet') }}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </enso-form>
    </modal>
</template>

<script>
import { mapState } from 'vuex';
import {
    Modal, EnsoForm, FormField, EnsoDatepicker,
} from '@enso-ui/bulma';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Fade } from '@enso-ui/transitions';
import format from '@core-modules/plugins/date-fns/format';

library.add(faUserClock, faPlus, faMinus);

export default {
    name: 'EventForm',

    components: {
        Modal, EnsoForm, FormField, EnsoDatepicker, Fade,
    },

    inject: ['i18n', 'route'],

    props: {
        event: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapState(['meta']),
        path() {
            return this.event.id
                ? this.route('core.calendar.events.edit', { event: this.event.id })
                : this.route('core.calendar.events.create');
        },
        reminderFormat() {
            return `${this.meta.dateFormat} H:i`;
        },
    },

    methods: {
        init() {
            if (this.event.startDate && this.event.startTime) {this.$refs.form.field('starts_at').value = `${this.dateFormat(this.event.startDate)} ${this.event.startTime.trim()}`;}
            if (this.event.endDate && this.event.endTime) {this.$refs.form.field('ends_at').value = `${this.dateFormat(this.event.endDate)} ${this.event.endTime.trim()}`;}
        },
        reminderFactory() {
            return {
                id: null,
                event_id: this.event.id,
                remind_at: null,
            };
        },
        addReminder() {
            this.$refs.form.field('reminders')
                .value.push(this.reminder());
        },
        dateFormat(date) {
            return format(date, this.meta.dateFormat);
        },
    },
};
</script>

<style lang="scss">
    .modal.event-modal .modal-content {
        overflow: visible;
    }
</style>
