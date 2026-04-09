<template>
    <div class="container p-4 has-text-centered">
        <span class="icon is-large">
            <fa class="has-text-info"
                :icon="faScrewdriverWrench"
                size="2x"/>
        </span>
        <p class="subtitle is-3 mx-6">
            {{ i18n(message) }}
        </p>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'NotFound',

    components: { Fa },

    data: () => ({
        faScrewdriverWrench,
        message: 'The application is briefly unavailable for scheduled maintenance. Please check back in a few minutes',
    }),

    inject: ['i18n'],
};
</script>
