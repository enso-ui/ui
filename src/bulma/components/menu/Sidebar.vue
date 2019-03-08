<template>
    <core-sidebar>
        <template v-slot:default="{ menus, isActive }">
            <vue-aside class="menu">
                <p class="menu-label has-text-centered">
                    {{ i18n("Menu") }}
                </p>
                <menus :menus="menus"
                    :is-active="isActive"/>
            </vue-aside>
        </template>
    </core-sidebar>
</template>

<script>
import CoreSidebar from '../../../core/components/menu/Sidebar.vue';
import Menus from './Menus.vue';
import VueAside from '../VueAside.vue';

export default {
    name: 'Sidebar',

    components: { CoreSidebar, Menus, VueAside },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    .aside.menu {
        overflow-y: auto;
        transition: width .5s;

        &.is-collapsed {
            width: 56px;
        }
    }
</style>
