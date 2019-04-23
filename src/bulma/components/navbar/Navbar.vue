<template>
    <core-navbar>
        <template v-slot:default="{ isMobile, isTouch, menu, meta, impersonating, toggleMenu }">
            <nav class="navbar app-navbar has-background-light is-fixed-top">
                <div class="navbar-brand">
                    <a class="navbar-item logo" href="#">
                        <figure class="image is-24x24">
                            <img src="/images/logo.svg">
                        </figure>
                        <h4 v-if="menu.isExpanded && !isMobile"
                            class="title is-4 animated has-margin-left-small">
                            {{ meta.appName }}
                        </h4>
                    </a>
                    <a class="navbar-item"
                        @click="toggleMenu(isTouch)">
                        <span class="icon is-small">
                            <fa icon="bars"
                                :class="{ 'rotate': !menu.isExpanded || !menu.isVisible }"/>
                        </span>
                    </a>
                    <div v-if="meta.env === 'local'"
                        class="navbar-item">
                        <span class="tag is-warning">
                            <span class="icon is-small">
                                <fa icon="code"/>
                            </span>
                        </span>
                    </div>
                    <div v-if="impersonating"
                        class="navbar-item">
                        <a v-tooltip="i18n('Impersonating')"
                            class="button is-small is-warning"
                            @click="$root.$emit('stop-impersonating')">
                            <span class="icon is-small">
                                <fa icon="user"/>
                            </span>
                            <span class="icon is-small">
                                <fa icon="times"/>
                            </span>
                        </a>
                    </div>
                    <div v-if="isTouch"
                        class="is-pulled-right is-flex">
                        <search v-if="!isMobile"/>
                        <i-o/>
                        <notifications/>
                        <profile-control/>
                        <settings-control/>
                    </div>
                </div>
                <div class="navbar-menu">
                    <div v-if="!isTouch"
                        class="navbar-end">
                        <search/>
                        <missing-keys/>
                        <i-o/>
                        <notifications/>
                        <profile-control/>
                        <settings-control/>
                    </div>
                </div>
            </nav>
        </template>
    </core-navbar>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars, faCode, faUser, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import CoreNavbar from '../../../core/components/navbar/Navbar.vue';
import MissingKeys from './MissingKeys.vue';
import IO from './IO.vue';
import Notifications from './Notifications.vue';
import SettingsControl from './SettingsControl.vue';
import ProfileControl from './ProfileControl.vue';
import Search from './Search.vue';

library.add(faBars, faCode, faUser, faTimes);

export default {
    name: 'Navbar',

    directives: { tooltip: VTooltip },

    components: {
        CoreNavbar, MissingKeys, IO, Notifications, SettingsControl, ProfileControl, Search,
    },

    inject: ['i18n'],
};
</script>

<style lang="scss">
$directions :( rtl:'right', ltr:'left');
@each $dir, $direction in $directions {

[dir='#{$dir}'] {
    .navbar {
        z-index: 3;
        -webkit-box-shadow: 0 1px 1px hsla(0,0%,4%,.35);
        box-shadow: 0 1px 1px hsla(0,0%,4%,.35);

        .fa-bars {
            transition: transform .300s;

            &.rotate {
                transform: rotate(90deg);
            }
        }

        .is-pulled-right {
            margin-#{$direction}: auto;
        }
    }
}}
</style>
