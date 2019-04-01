<template>
    <core-menus v-bind="$attrs"
        v-on="$listeners">
        <template v-slot:default="{ menus, isActive, parentMenuEvents, isRTL }">
        <ul class="menu-list">
            <li v-for="menu in menus"
                :key="menu.name">
                <s-menu-item :isRTL='isRTL'> 
                <menu-item :class="{ 'is-active': isActive(menu) }"
                    :menu="menu"/>
                </s-menu-item>
                <menus :menus="menu.children"
                    :collapsed="!menu.expanded"
                    :is-active="isActive"
                    v-on="parentMenuEvents"
                    v-if="menu.has_children"/>
            </li>
        </ul>
        </template>
    </core-menus>
</template>

<script>
import CoreMenus from '../../../core/components/menu/Menus.vue';
import SMenuItem from './styled/SMenuItem';
import MenuItem from './MenuItem.vue';
import './icons';

export default {
    name: 'Menus',

    components: { CoreMenus, MenuItem, SMenuItem },
};
</script>

<style lang="scss" scoped>
    .menu-list {
        transition: height .333s ease;
        display: block;
        overflow-y: hidden;
        overflow-x: hidden;

        li > ul {
            margin: 0 0 0 .5rem;
            padding-left: 0;
        }
    }
</style>
