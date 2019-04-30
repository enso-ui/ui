<template>
    <div class="box has-background-light raises-on-hover has-padding-large"
        @mouseover="controls = true"
        @mouseleave="controls = !confirmation ? false : controls">
        <p class="title is-5">
            {{ person.name }}
        </p>
        <p class="subtitle is-6">
            {{ person.position }}
        </p>
        <p v-if="person.email">
            {{ person.email }}
        </p>
        <p v-if="person.phone">
            {{ person.phone }}
            <span class="is-pulled-right is-flex"
                v-if="controls">
                <a class="button is-naked is-small"
                    @click="$emit('edit')">
                    <span class="icon">
                        <fa icon="pencil-alt"/>
                    </span>
                </a>
                <confirmation placement="top"
                    @show="confirmation = true"
                    @hide="confirmation = controls = false"
                    @confirm="$emit('delete')">
                    <a class="button is-naked is-small">
                        <span class="icon">
                            <fa icon="trash-alt"/>
                        </span>
                    </a>
                </confirmation>
            </span>
        </p>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCheck, faTimes, faEnvelope, faPhone, faInfoCircle, faPencilAlt, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Confirmation } from '@enso-ui/bulma';

library.add([
    faCheck, faTimes, faEnvelope, faPhone, faInfoCircle, faPencilAlt, faTrashAlt,
]);

export default {
    name: 'Person',

    inject: ['canAccess'],

    directives: { tooltip: VTooltip },

    components: { Confirmation },

    props: {
        person: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        controls: false,
        confirmation: false,
    }),
};
</script>

<style scoped>
    .details {
        display: flex;
        justify-content: center;
    }
</style>
