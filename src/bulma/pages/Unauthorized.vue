<template>
    <div class="container p-4 has-text-centered">
        <span class="icon is-large">
            <fa class="has-text-danger"
                :icon="faBan"
                size="2x"/>
        </span>
        <p class="subtitle is-3">
            {{ i18n('You are not authorized here') }}
        </p>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'Unauthorized',

    components: { Fa },

    data: () => ({
        faBan,
    }),

    inject: ['i18n'],
};
</script>
