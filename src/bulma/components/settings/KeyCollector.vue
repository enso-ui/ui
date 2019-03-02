<template>
    <core-key-collector>
        <template v-slot:default="{ bindings, events }">
            <div class="level is-mobile settings">
                <div class="level-left">
                    <div class="level-item">
                        {{ __('Key Collector') }}
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
    </core-key-collector>
</template>

<script>
import { VueSwitch } from '@enso-ui/bulma';
import CoreKeyCollector from '../../../core/components/settings/KeyCollector.vue';

export default {
    name: 'BookmarksState',

    components: { CoreKeyCollector, VueSwitch },
};
</script>
