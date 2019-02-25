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
                        {{ __(menu.name) }}
                    </span>
                </zoom>
                <dropdown-indicator class="is-small"
                    :collapsed="!menu.expanded"
                    v-if="menu.has_children"/>
                <div class="dropdown-content">
                    <div v-if="!expandedMenu"
                        class="dropdown-item">
                        {{ __(menu.name) }}
                    </div>
                </div>
            </a>
        </template>
    </core-menu-item>
</template>

<script>

import { Zoom, DropdownIndicator } from '@enso-ui/bulma';
import CoreMenuItem from '../../../core/components/menu/MenuItem.vue';

export default {
    components: { Zoom, CoreMenuItem, DropdownIndicator },
};
</script>

<style lang="scss" scoped>
    .menu-item {
        display: flex;

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
            left: 56px;
        }

        .icon.angle.is-small {
            margin-left: auto;
        }
    }
</style>
