<template>
    <vue-aside class="sidebar no-scrollbars"
        :class="$attrs.class">
        <p class="menu-label is-bold has-text-centered">
            {{ i18n("Menu") }}
        </p>
        <core-sidebar>
            <template #default="{ menus }">
                <menus v-bind="$attrs"
                    :menus="menus"/>
            </template>
        </core-sidebar>
    </vue-aside>
</template>

<script>
import Menus from '@enso-ui/menus/src/bulma/components/menu/Menus.vue';
import CoreSidebar from '../../../core/components/menu/Sidebar.vue';
import VueAside from '../VueAside.vue';

export default {
    name: 'Sidebar',

    components: { CoreSidebar, Menus, VueAside },

    inject: ['i18n'],

    inheritAttrs: false,
};
</script>

<style lang="scss">
    @import '@enso-ui/themes/bulma/variables';

    .aside.sidebar {
        overflow-y: auto;
        transition: width .5s;

        &.is-collapsed {
            width: $sidebar-collapsed-width;
        }
    }
</style>
