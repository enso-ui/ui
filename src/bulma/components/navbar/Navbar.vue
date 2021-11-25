<template>
    <nav class="navbar app-navbar is-fixed-top">
        <core-navbar>
            <template #default="{
                isMobile, isTouch, sidebar, meta, impersonating,
                stopImpersonating, toggleSidebar, items,
            }">
                <div class="navbar-brand">
                    <a class="navbar-item"
                        @click="toggleSidebar(isTouch)">
                        <span class="icon">
                            <fa icon="bars"
                                :class="{ 'rotate': !sidebar.isExpanded || !sidebar.isVisible }"/>
                        </span>
                    </a>
                    <a class="navbar-item logo"
                        href="#">
                        <figure class="image is-32x32 is-flex">
                            <img src="/images/logo.svg">
                        </figure>
                        <h4 class="title is-4 ml-1"
                            v-if="!isMobile">
                            {{ meta.appName }}
                        </h4>
                    </a>
                    <div class="navbar-item"
                        v-if="meta.env !== 'production'">
                        <span class="tag is-warning is-clickable"
                            v-tooltip="meta.env">
                            <span class="icon is-small">
                                <fa icon="code"/>
                            </span>
                        </span>
                    </div>
                    <div class="navbar-item"
                        v-if="impersonating">
                        <a v-tooltip="i18n('Stop Impersonating')"
                            class="button is-small is-warning"
                            @click="stopImpersonating">
                            <span class="icon is-small">
                                <fa icon="user"/>
                            </span>
                            <span class="icon is-small">
                                <fa icon="times"/>
                            </span>
                        </a>
                    </div>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-end">
                        <search v-if="!isMobile"/>
                        <component v-for="item in items"
                            :is="item"
                            :key="item"/>
                        <app-update/>
                        <settings-control/>
                    </div>
                </div>
            </template>
        </core-navbar>
    </nav>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars, faCode, faUser, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import CoreNavbar from '../../../core/components/navbar/Navbar.vue';
import AppUpdate from './AppUpdate.vue';
import SettingsControl from './SettingsControl.vue';
import Search from './Search.vue';

library.add(faBars, faCode, faUser, faTimes);

export default {
    name: 'Navbar',

    components: {
        AppUpdate,
        CoreNavbar,
        Fa,
        Search,
        SettingsControl,
    },

    inject: ['i18n'],
};
</script>

<style lang="scss">
@import '@enso-ui/themes/bulma/variables';

.navbar {
    height: $navbar-height;
    z-index: 3;
    -webkit-box-shadow: 0 1px 1px hsla(0, 0%, 4%, .35);
    box-shadow: 0 1px 1px hsla(0, 0%, 4%, .35);

    .navbar-item.logo .image img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        margin: auto;
    }

    .fa-bars {
        transition: transform .300s;

        &.rotate {
            transform: rotate(90deg);
        }
    }
}

</style>
