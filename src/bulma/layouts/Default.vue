<template>
    <core-default v-slot:default="{ appState, lightsOff, bookmarks, menu, settingsBar }">
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
            <slide-left>
                <sidebar :class="{ 'is-collapsed' : !menu.isExpanded }"
                    v-if="menu.isVisible"/>
            </slide-left>
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
            <settings class="animated"
                :class="settingsBar.isVisible ? 'slideInRight': 'slideOutRight'"/>
            <app-footer class="animated slideInUp"/>
        </div>
    </core-default>
</template>

<script>

import { SlideDown, SlideLeft } from '@enso-ui/transitions';
import CoreDefault from '../../core/layouts/Default.vue';
import Navbar from '../components/navbar/Navbar.vue';
import Sidebar from '../components/menu/Sidebar.vue';
import Settings from '../components/settings/Settings.vue';
import AppFooter from '../components/AppFooter.vue';
import Router from '../Router.vue';
import Bookmarks from '../components/Bookmarks.vue';
import PageHeader from '../components/PageHeader.vue';

export default {
    components: {
        CoreDefault,
        SlideDown,
        SlideLeft,
        Navbar,
        Sidebar,
        Settings,
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
        }

        &.is-expanded {
            margin-left: 180px;
        }
    }

    @media screen and (max-width: 1023px) {
        .main-content {
            &.is-expanded, &.is-collapsed {
                margin-left: 0;
            }
        }
    }

    .wrapper.page-content {
        padding: 1.2em;
        margin-top: 0;
    }

</style>
