<template>
    <core-sidebar-state>
        <template #default="{ bindings, events }">
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="level-item">
                        <span class="menu-item-label">
                            {{ i18n('Expanded Menu') }}
                        </span>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <vue-switch v-bind="bindings"
                            v-on="events"/>
                    </div>
                </div>
            </div>
        </template>
    </core-sidebar-state>
</template>

<script>
import VueSwitch from '@enso-ui/switch/bulma';
import CoreSidebarState from '../../../core/components/settings/SidebarState.vue';

export default {
    name: 'SidebarState',

    components: { CoreSidebarState, VueSwitch },

    inject: ['i18n'],
};
</script>
