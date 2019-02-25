<template>
    <core-menu-state>
        <template v-slot:default="{ bindings, events }">
            <div class="level is-mobile settings">
                <div class="level-left">
                    <div class="level-item">
                        {{ __('Expanded Menu') }}
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
import { VueSwitch } from '@enso-ui/bulma';
import CoreMenuState from '../../../core/components/settings/MenuState.vue';

export default {
    components: { CoreMenuState, VueSwitch },
};
</script>
