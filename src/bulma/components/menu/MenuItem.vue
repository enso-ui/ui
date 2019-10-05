<template>
    <core-menu-item v-bind="$attrs"
        v-on="$listeners">
        <template v-slot:default="{ menu, expandedMenu, menuEvents }">
            <a class="menu-item"
                v-on="menuEvents">
                <span class="icon is-small">
                    <fa fixed-width
                        :icon="menu.icon"/>
                </span>
                <zoom>
                    <span v-if="expandedMenu"
                        class="has-margin-left-small menu-hiding-label">
                        {{ i18n(menu.name) }}
                    </span>
                </zoom>
                <dropdown-indicator class="is-small"
                    :open="menu.expanded"
                    v-if="menu.has_children"/>
                <div class="dropdown-content">
                    <div v-if="!expandedMenu"
                        class="dropdown-item">
                        {{ i18n(menu.name) }}
                    </div>
                </div>
            </a>
        </template>
    </core-menu-item>
</template>

<script>

import { Zoom } from '@enso-ui/transitions';
import DropdownIndicator from '@enso-ui/dropdown-indicator';
import CoreMenuItem from '../../../core/components/menu/MenuItem.vue';

export default {
    name: 'MenuItem',

    components: { Zoom, CoreMenuItem, DropdownIndicator },

    inject: ['i18n'],
};
</script>

<style lang="scss" scoped>
    .menu-item {
        display: flex;
        padding: 0.5em 0.4em;

        &:hover > div.dropdown-content {
            display: block;
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
                left: 56px;
            }
            [dir='rtl'] & {
                right: 56px;
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
</style>
