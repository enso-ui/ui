<template>
    <core-default v-slot:default="{ appState, lightsOff, bookmarks, menu, settingsBar, isRTL, slideIn, slideOut }">
    <s-default :isRTL='isRTL'>
        <div class="app-main"
            :class="{ 'lights-off': lightsOff }">
            <navbar class="animated slideInDown"/>
            <slide-down>
                <s-bookmarks :isRTL='isRTL'>
                <bookmarks :class="[
                        { 'with-menu': menu.isVisible },
                        { 'menu-collapsed': !menu.isExpanded }
                    ]"
                    v-if="bookmarks"/>
                </s-bookmarks>
            </slide-down>
            <horizontal-slide :isRTL='isRTL'> 
                <sidebar :class="{ 'is-collapsed' : !menu.isExpanded }"
                    v-if="menu.isVisible"/>
            </horizontal-slide>
            <section class="main-content"
                :class="[
                    menu.isExpanded ? 'is-expanded' : 'is-collapsed',
                    { 'with-bookmarks': bookmarks }
                ]">
                <div class="wrapper page-content">
                    <page-header/>
                    <router v-if="appState"/>
                </div>
            </section>
            <scroll-to-top type="is-medium is-primary is-raised" :isRTL="isRTL"/>
            <settings class="animated"
                :class="settingsBar.isVisible ? slideIn : slideOut "/>
            <app-footer class="animated slideInUp"/>
        </div>
    </s-default>
    </core-default>
</template>

<script>
import { SlideDown, HorizontalSlide } from '@enso-ui/transitions';
import { ScrollToTop } from '@enso-ui/bulma';
import CoreDefault from '../../core/layouts/Default.vue';
import SDefault from './styled/SDefault.js';
import Navbar from '../components/navbar/Navbar.vue';
import Sidebar from '../components/menu/Sidebar.vue';
import Settings from '../components/settings/Settings.vue';
import AppFooter from '../components/AppFooter.vue';
import Router from '../pages/Router.vue';
import Bookmarks from '../components/Bookmarks.vue';
import SBookmarks from '../components/styled/SBookmarks';
import PageHeader from '../components/PageHeader.vue';

export default {
    name: 'Default',

    components: {
        CoreDefault,
        SDefault,
        SlideDown,
        HorizontalSlide,
        Navbar,
        Sidebar,
        Settings,
        ScrollToTop,
        AppFooter,
        Router,
        Bookmarks,
        SBookmarks,
        PageHeader,
    },
};
</script>

<style lang="scss">
    .app-main {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        opacity: 1;
        transition: all .15s ease;

        &.lights-off {
            opacity: 0;
        }
    }

    .main-content {
        flex: 1;
        z-index: 1;
        margin-top: 52px;
        transition: margin .5s;

        &.with-bookmarks {
            margin-top: 82px;
        }
    }

    .wrapper.page-content {
        padding: 1.2em;
        margin-top: 0;
    }
</style>
