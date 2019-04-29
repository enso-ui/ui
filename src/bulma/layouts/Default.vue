<template>
    <core-default v-slot:default="{ appState, lightsOff, bookmarks, menu, settingsBar, rtl, slideIn, slideOut }">
        <div class="app-main"
            :class="{ 'lights-off': lightsOff }">
            <navbar class="animated slideInDown"/>
            <slide-down>
                <bookmarks :class="[
                        { 'with-menu': menu.isVisible },
                        { 'menu-collapsed': !menu.isExpanded }
                    ]"
                    v-if="bookmarks"/>
            </slide-down>
            <horizontal-slide :rtl='rtl'>
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
            <scroll-to-top type="is-medium is-primary is-raised"/>
            <settings class="animated"
                :class="settingsBar.isVisible ? slideIn : slideOut"/>
            <app-footer class="animated slideInUp"/>
        </div>
    </core-default>
</template>

<script>
import { SlideDown, HorizontalSlide } from '@enso-ui/transitions';
import { ScrollToTop } from '@enso-ui/bulma';
import CoreDefault from '../../core/layouts/Default.vue';
import Navbar from '../components/navbar/Navbar.vue';
import Sidebar from '../components/menu/Sidebar.vue';
import Settings from '../components/settings/Settings.vue';
import AppFooter from '../components/AppFooter.vue';
import Router from '../pages/Router.vue';
import Bookmarks from '../components/Bookmarks.vue';
import PageHeader from '../components/PageHeader.vue';

export default {
    name: 'Default',

    components: {
        CoreDefault,
        SlideDown,
        HorizontalSlide,
        Navbar,
        Sidebar,
        Settings,
        ScrollToTop,
        AppFooter,
        Router,
        Bookmarks,
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

        &.is-collapsed {
            margin-left: 56px;
            [dir='rtl'] & {
                    margin-right: 56px;
                    margin-left: unset;
            }
        }

        &.is-expanded {
            margin-left: 180px;
            [dir='rtl'] & {
                    margin-right: 180px;
                    margin-left: unset;
                }
        }
    }

    @media screen and (max-width: 1023px) {
        .main-content {
            &.is-expanded, &.is-collapsed {
                margin-left: 0;
                [dir='rtl'] & {
                        margin-right: 0;
                        margin-left: unset;
                }
            }
        }
    }

    .wrapper.page-content {
        padding: 1.2em;
        margin-top: 0;
    }

</style>
