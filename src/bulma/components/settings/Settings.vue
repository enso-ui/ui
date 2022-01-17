<template>
    <vue-aside class="settings">
        <p class="menu-label is-bold has-text-centered">
          {{ i18n("Settings") }}
        </p>
        <core-settings>
            <template #default="{ items }">
                <ul class="menu-list">
                    <li v-for="({ key, component }) in items"
                        class="settings-item"
                        :key="key">
                        <component :is="component"/>
                    </li>
                    <li class="settings-item">
                        <sidebar-state/>
                    </li>
                </ul>
            </template>
        </core-settings>
    </vue-aside>
</template>

<script>
import CoreSettings from '../../../core/components/settings/Settings.vue';
import VueAside from '../VueAside.vue';
import SidebarState from './SidebarState.vue';

export default {
    name: 'Settings',

    components: {
        CoreSettings,
        VueAside,
        SidebarState,
    },

    inject: ['canAccess', 'i18n'],
};

</script>

<style lang="scss">

    .settings {
        overflow-y: auto;
        [dir='ltr'] & {
            right: 0;
        }
        [dir='rtl'] & {
            left: 0;
        }

        .settings-item {
            &:not(:empty) {
                padding: 6px;
            }

            .level-item {
                [dir='ltr'] & {
                    margin-right: unset;
                }
                [dir='rtl'] & {
                    margin-left: unset;
                }
            }
        }
    }

</style>
