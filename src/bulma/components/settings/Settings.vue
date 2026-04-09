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
    .aside.settings {
        position: fixed;
        top: var(--bulma-navbar-height);
        bottom: 0;
        height: calc(100dvh - var(--bulma-navbar-height));
        max-height: calc(100dvh - var(--bulma-navbar-height));
        z-index: 40;
        overflow-y: auto;
        border-top: 1px solid var(--bulma-border);

        .menu-label {
            margin-bottom: 0.4rem;
            flex: 0 0 auto;
            font-size: 0.8rem;
            font-weight: 600;
        }

        [dir='ltr'] & {
            right: 0;
        }
        [dir='rtl'] & {
            left: 0;
        }

        .settings-item {
            &:not(:empty) {
                padding: 6px 12px;
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
