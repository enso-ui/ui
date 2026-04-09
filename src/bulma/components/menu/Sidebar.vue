<template>
    <vue-aside class="sidebar no-scrollbars"
        :class="$attrs.class">
        <p class="menu-label is-bold has-text-centered">
            {{ i18n("Menu") }}
        </p>
        <div class="sidebar-scroll no-scrollbars">
            <core-sidebar>
                <template #default="{ menus }">
                    <menus v-bind="$attrs"
                        :menus="menus"/>
                </template>
            </core-sidebar>
        </div>
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
    .aside.sidebar {
        display: flex;
        flex-direction: column;
        overflow: visible;
        transition: width .5s;

        .menu-label {
            margin-bottom: 0.8rem;
            flex: 0 0 auto;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .sidebar-scroll {
            flex: 1 1 auto;
            min-height: 0;
            overflow-y: auto;
            overflow-x: visible;
        }

        &.is-collapsed {
            width: var(--enso-sidebar-collapsed-width);
        }
    }
</style>
