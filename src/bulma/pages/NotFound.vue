<template>
    <div class="container p-4 has-text-centered">
        <span class="icon is-large">
            <fa class="has-text-warning"
                :icon="faTriangleExclamation"
                size="2x"/>
        </span>
        <p class="subtitle is-3">
            {{ i18n('The requested page does not exist') }}
        </p>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'NotFound',

    components: { Fa },

    data: () => ({
        faTriangleExclamation,
    }),

    inject: ['i18n'],
};
</script>
