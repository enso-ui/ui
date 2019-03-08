<template>
    <span>
        <span v-if="index > 0">
            &
        </span>
        -
        {{ i18n(change.attribute) }}
        {{ i18n('was changed') }}
        <span v-if="!isBool(change.before)">
            {{ i18n('from') }}
            <strong>{{ change.before }}</strong>
        </span>
        {{ i18n('to') }}
        <span :class="[
                'icon',
                change.after ? 'has-text-success' : 'has-text-danger'
            ]"
            v-if="isBool(change.after)">
            <fa :icon="change.after ? 'check-circle' : 'times-circle'"/>
        </span>
        <strong v-else>
            {{ change.after }}
        </strong>
    </span>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faTimesCircle);

export default {
    name: 'Change',

    inject: ['i18n'],

    props: {
        change: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },

    methods: {
        isBool(value) {
            return value === true || value === false;
        },
    },
};
</script>
