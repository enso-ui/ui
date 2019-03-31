<template>
    <core-default v-slot:default="{ appState, lightsOff, bookmarks, menu, settingsBar, rtlClass, isRTL, slideIn, slideOut }">
    <s-default :isRTL='isRTL'>
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
            <!--<slide-left> //FIX : Transition Ugly from rtl to ltr-->
            <component :is="'slide-' +rtlClass " mode="in-out"> //REVIEW : refactor after test
                <sidebar :class="{ 'is-collapsed' : !menu.isExpanded }"
                    v-if="menu.isVisible"/>
            </component>
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
            <!-- <scroll-to-top type="is-medium is-primary is-raised" :direction="rtlClass"/> -->
            <scroll-to-top type="is-medium is-primary is-raised"/>
            <settings class="animated"
                :class="settingsBar.isVisible ? slideIn : slideOut "/>
            <app-footer class="animated slideInUp"/>
        </div>
    </s-default>
    </core-default>
</template>

<script>
import { SlideDown, SlideLeft, SlideRight } from '@enso-ui/transitions';
import { ScrollToTop } from '@enso-ui/bulma';
import CoreDefault from '../../core/layouts/Default.vue';
import SDefault from './styled/Default.js';
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
        SDefault,
        SlideDown,
        SlideLeft,
        SlideRight,
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

        /* &.is-collapsed {
            &.left {
                margin-left: 56px;
            }
            &.right {
                margin-right: 56px;
            }
        }

        &.is-expanded {
            &.left {
                margin-left: 180px;
            }
            &.right {
                margin-right: 180px;
            }
        }*/
    }
    /*
    @media screen and (max-width: 1023px) {
        .main-content {
            &.is-expanded, &.is-collapsed {
                &.left {
                    margin-left: 0;
                }
                &.right {
                    margin-right: 0;
                }
            }
        }
    } */

    .wrapper.page-content {
        padding: 1.2em;
        margin-top: 0;
    }
</style>
