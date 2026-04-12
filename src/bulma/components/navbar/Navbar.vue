<template>
    <nav class="navbar app-navbar is-fixed-top">
        <core-navbar>
            <template #default="{
                isMobile, sidebar, meta, impersonating,
                stopImpersonating, toggleSidebar, items,
            }">
                <div class="navbar-brand">
                    <a class="navbar-item"
                        @click="toggleSidebar()">
                        <span class="icon">
                            <fa :icon="faBars"
                                :class="{ 'rotate': !sidebar.isExpanded || !sidebar.isVisible }"/>
                        </span>
                    </a>
                    <a class="navbar-item logo"
                        href="#">
                        <figure class="image is-32x32 is-flex">
                            <img src="/images/logo.svg">
                        </figure>
                        <span class="navbar-brand-title ml-1"
                            v-if="!isMobile">
                            {{ meta.appName }}
                        </span>
                    </a>
                    <div class="navbar-item"
                        v-if="meta.env !== 'production'">
                        <span class="tag is-warning is-clickable"
                            v-tooltip="meta.env">
                            <span class="icon is-small">
                                <fa :icon="faCode"/>
                            </span>
                        </span>
                    </div>
                    <div class="navbar-item"
                        v-if="impersonating">
                        <a v-tooltip="i18n('Stop Impersonating')"
                            class="button is-small is-warning"
                            @click="stopImpersonating">
                            <span class="icon is-small">
                                <fa :icon="faUser"/>
                            </span>
                            <span class="icon is-small">
                                <fa :icon="faXmark"/>
                            </span>
                        </a>
                    </div>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-end">
                        <search v-if="!isMobile"/>
                        <component v-for="item in items"
                            :is="item.component"
                            :key="item.key"/>
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
import {
    faBars, faCode, faUser, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import CoreNavbar from '../../../core/components/navbar/Navbar.vue';
import AppUpdate from './AppUpdate.vue';
import SettingsControl from './SettingsControl.vue';
import Search from './Search.vue';

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

    data: () => ({
        faBars,
        faCode,
        faXmark,
        faUser,
    }),
};
</script>

<style lang="scss">
.navbar {
    height: var(--enso-navbar-height);
    z-index: 3;
    background-color: var(--enso-shell-surface);
    border-bottom: 1px solid var(--bulma-border);
    box-shadow: none;
    color: var(--bulma-navbar-item-color);

    .navbar-item.logo .image img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        margin: auto;
    }

    .navbar-item.logo {
        gap: 0.15rem;
    }

    .navbar-brand-title {
        color: inherit;
        font-weight: 600;
    }

    .fa-bars {
        transition: transform .300s;

        &.rotate {
            transform: rotate(90deg);
        }
    }
}

</style>
