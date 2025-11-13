<template>
    <div class="app-main"
        :class="{ 'lights-off': lightsOff }">
        <core-default v-slot="{
            appState, bookmarks, sidebar, settings, rtl, header, footer,
            }">
            <navbar-refresh/>
            <slide enter="down"
                leave="up">
                <bookmarks :class="[
                    { 'with-sidebar': sidebar.isVisible },
                    { 'sidebar-collapsed': !sidebar.isExpanded }
                ]"
                v-if="bookmarks"/>
            </slide>
            <slide :enter="rtl ? 'right' : 'left'"
                :leave="rtl ? 'right' : 'left'">
                <sidebar :class="{ 'is-collapsed' : !sidebar.isExpanded }"
                    v-if="sidebar.isVisible"/>
            </slide>
            <section class="main-content is-relative"
                 :class="[
                  sidebar.isExpanded ? 'is-expanded' : 'is-collapsed',
                  { 'with-bookmarks': bookmarks }
              ]">
              <div class="wrapper page-content">
                  <page-header :key="$route.path"
                    v-if="header"/>
                  <main-router v-if="appState"/>
              </div>
            </section>
            <scroll-to-top type="is-medium is-primary is-raised"/>
            <slide :enter="rtl ? 'left' : 'right'"
                :leave="rtl ? 'left' : 'right'">
                <settings v-if="settings.isVisible"/>
            </slide>
            <slide enter="up"
                leave="down">
                <app-footer :class="{ 'sidebar-collapsed': !sidebar.isExpanded }"
                    v-if="footer"/>
            </slide>
        </core-default>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Slide } from '@enso-ui/transitions';
import ScrollToTop from '@enso-ui/scroll-to-top/bulma';
import Bookmarks from '@enso-ui/bookmarks/src/bulma/components/Bookmarks.vue';
import CoreDefault from '../../core/layouts/Default.vue';
import NavbarRefresh from '../components/navbar/NavbarRefresh.vue';
import Sidebar from '../components/menu/Sidebar.vue';
import Settings from '../components/settings/Settings.vue';
import AppFooter from '../components/AppFooter.vue';
import MainRouter from '../pages/MainRouter.vue';
import PageHeader from '../components/PageHeader.vue';

export default {
    name: 'Default',

    components: {
        CoreDefault,
        Slide,
        NavbarRefresh,
        Sidebar,
        Settings,
        ScrollToTop,
        AppFooter,
        MainRouter,
        Bookmarks,
        PageHeader,
    },

    computed: {
        ...mapState('layout', ['lightsOff']),
    },
};
</script>

<style lang="scss">
    @import '@enso-ui/themes/bulma/variables';

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
        margin-top: $navbar-height;
        transition: margin .5s;

        &.with-bookmarks {
            margin-top: 82px;
        }

        &.is-collapsed {
            [dir='ltr'] & {
                margin-left: $sidebar-collapsed-width;
            }
            [dir='rtl'] & {
                margin-right: $sidebar-collapsed-width;
            }
        }

        &.is-expanded {
            [dir='ltr'] & {
                margin-left: $sidebar-width;
            }
            [dir='rtl'] & {
                margin-right: $sidebar-width;
                }
        }
    }

    @media screen and (max-width: 1023px) {
        .main-content {
            &.is-expanded, &.is-collapsed {
                [dir='ltr'] & {
                    margin-left: 0;
                }
                [dir='rtl'] & {
                    margin-right: 0;
                }
            }
        }
    }

    .wrapper.page-content {
        padding: 1em;
        margin-top: 0;
    }

    @media screen and (max-width: 1023px) {
        .wrapper.page-content {
            padding: 0.4em;
            margin-top: 0;
        }
    }

</style>
