<template>
    <div class="box has-padding-small raises-on-hover has-margin-bottom-medium">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <span class="icon is-small has-margin-small"
                        v-tooltip="token.name">
                        <fa icon="key"/>
                    </span>
                    <span>
                        {{ token.name }}
                    </span>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <span class="icon is-small"
                        v-tooltip="lastUsed(token)">
                        <fa icon="calendar-alt"/>
                    </span>
                    <span class="is-pulled-right is-flex">
                        <confirmation placement="top"
                            @show="confirmation = true"
                            @hide="confirmation = false"
                            @confirm="$emit('delete')">
                            <a class="button is-naked is-small">
                                <span class="icon">
                                    <fa icon="trash-alt"/>
                                </span>
                            </a>
                        </confirmation>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrashAlt, faInfoCircle, faCalendarAlt, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import Confirmation from '@enso-ui/confirmation/bulma';
import formatDistance from '../../../../../modules/plugins/date-fns/formatDistance';

library.add([
    faCalendarAlt, faInfoCircle, faPencilAlt, faTrashAlt,
]);

export default {
    name: 'Token',

    inject: ['canAccess'],

    directives: { tooltip: VTooltip },

    components: { Confirmation },

    props: {
        token: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        confirmation: false,
    }),

    methods: {
        lastUsed({ lastUsedAt }) {
            return lastUsedAt
                ? `last used: ${formatDistance(lastUsedAt)}`
                : 'Not used yet';
        },
    },
};
</script>
