<template>
    <core-menu-item v-bind="$attrs"
        v-on="$listeners">
        <template v-slot:default="{ menu, editable, expandedSidebar, hasActiveChild, menuEvents }">
            <div class="menu-item has-vertically-centered-content"
                v-on="menuEvents">
                <div class="icon is-small"
                    :class="{ 'is-opaque': !menu.active && !hasActiveChild }">
                    <fa class="handle"
                        fixed-width
                        icon="grip-lines"
                        v-if="editable"/>
                    <fa fixed-width
                        :icon="menu.icon"
                        v-else/>
                </div>
                <zoom>
                    <div v-if="expandedSidebar"
                        class="has-margin-left-medium menu-hiding-label"
                        :class="[{ 'is-bold': menu.active }, { 'is-opaque': !menu.active && !hasActiveChild }]">
                        {{ i18n(menu.name) }}
                    </div>
                </zoom>
                <dropdown-indicator class="is-small"
                    :open="menu.expanded"
                    v-if="menu.children"/>
                <div class="dropdown-content">
                    <div v-if="!expandedSidebar"
                        class="dropdown-item">
                        {{ i18n(menu.name) }}
                    </div>
                </div>
            </div>
        </template>
    </core-menu-item>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { Zoom } from '@enso-ui/transitions';
import DropdownIndicator from '@enso-ui/dropdown-indicator';
import CoreMenuItem from '../../../core/components/menu/MenuItem.vue';

library.add(faGripLines);

export default {
    name: 'MenuItem',

    components: { Zoom, CoreMenuItem, DropdownIndicator },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    @import '@enso-ui/themes/bulma/variables';

    .enso-menu {
        .menu-item {

            .is-opaque {
                opacity: 0.8;
            }

            display: flex;
            padding: 0.5em 0.4em;
            cursor: pointer;

            &:hover {
                font-weight: 800;
                div.dropdown-content {
                    display: block;
                }
            }

            .menu-hiding-label {
                white-space: nowrap;
            }

            .dropdown-content {
                display: none;
                white-space: nowrap;
                padding-bottom: 0;
                padding-top: 0;
                margin-top: -9px;
                position: fixed;
                [dir='ltr'] & {
                    left: $sidebar-collapsed-width;
                }
                [dir='rtl'] & {
                    right: $sidebar-collapsed-width;
                }
            }

            .icon.angle.is-small {
                [dir='ltr'] & {
                    margin-left: auto;
                }
                [dir='rtl'] & {
                    margin-right: auto;
                }
            }
        }
    }
</style>
