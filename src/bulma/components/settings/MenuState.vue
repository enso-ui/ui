<template>
    <core-menu-state>
        <template v-slot:default="{ bindings, events }">
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="level-item">
                        {{ i18n('Expanded Menu') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <vue-switch class="is-medium"
                            v-bind="bindings"
                            v-on="events"/>
                    </div>
                </div>
            </div>
        </template>
    </core-menu-state>
</template>

<script>
import VueSwitch from '@enso-ui/switch/bulma';
import CoreMenuState from '../../../core/components/settings/MenuState.vue';

export default {
    name: 'MenuState',

    components: { CoreMenuState, VueSwitch },

    inject: ['i18n'],
};
</script>
