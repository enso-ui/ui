<template>
    <core-settings-control>
        <template #default="{ toggle }">
            <a class="navbar-item settings"
                @click="toggle">
                <span class="icon">
                    <fa :icon="faGears"/>
                </span>
            </a>
        </template>
    </core-settings-control>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import CoreSettingsControl from '../../../core/components/navbar/SettingsControl.vue';

export default {
    name: 'SettingsControl',

    components: { CoreSettingsControl, Fa },

    data: () => ({
        faGears,
    }),
};
</script>
