<template>
    <core-missing-keys>
        <template v-slot:default="{ keyCollector, hover, count, events }">
            <div class="navbar-item key-collector"
                v-if="keyCollector">
                <span class="has-text-info is-bold">
                    {{ count }}
                </span>
                <span class="icon  is-clickable has-margin-left-medium"
                    :class="hover ? 'has-text-success' : 'has-text-danger'"
                    v-on="events">
                    <fa :icon="hover && count ? 'check' : 'language'"/>
                </span>
            </div>
        </template>
    </core-missing-keys>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLanguage, faCheck } from '@fortawesome/free-solid-svg-icons';
import CoreMissingKeys from '../../../core/components/navbar/MissingKeys.vue';

library.add(faLanguage, faCheck);

export default {
    name: 'MissingKeys',

    components: { CoreMissingKeys },
};
</script>
