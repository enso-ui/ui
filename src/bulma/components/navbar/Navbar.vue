<template>
    <core-navbar>
        <template v-slot:default="{
            isMobile, isTouch, sidebar, meta, impersonating,
            toggleSidebar, canAccessTasks,
        }">
            <nav class="navbar app-navbar is-fixed-top">
                <div class="navbar-brand">
                    <a class="navbar-item"
                        @click="toggleSidebar(isTouch)">
                        <span class="icon">
                            <fa icon="bars"
                                :class="{ 'rotate': !sidebar.isExpanded || !sidebar.isVisible }"/>
                        </span>
                    </a>
                    <a class="navbar-item logo" href="#">
                        <figure class="image is-24x24">
                            <img src="/images/logo.svg">
                        </figure>
                        <h4 class="title is-4 animated has-margin-left-small"
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
                            @click="$root.$emit('stop-impersonating')">
                            <span class="icon is-small">
                                <fa icon="user"/>
                            </span>
                            <span class="icon is-small">
                                <fa icon="times"/>
                            </span>
                        </a>
                    </div>
                    <div class="is-pulled-right is-flex"
                        v-if="isTouch">
                        <search v-if="!isMobile"/>
                        <i-o/>
                        <app-update/>
                        <tasks v-if="canAccessTasks"/>
                        <notifications/>
                        <profile-control/>
                        <settings-control/>
                    </div>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-end"
                        v-if="!isTouch">
                        <search/>
                        <missing-keys/>
                        <i-o/>
                        <app-update/>
                        <tasks v-if="canAccessTasks"/>
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
import AppUpdate from './AppUpdate.vue';
import Notifications from './Notifications.vue';
import Tasks from './Tasks.vue';
import SettingsControl from './SettingsControl.vue';
import ProfileControl from './ProfileControl.vue';
import Search from './Search.vue';

library.add(faBars, faCode, faUser, faTimes);

export default {
    name: 'Navbar',

    directives: { tooltip: VTooltip },

    components: {
        AppUpdate,
        CoreNavbar,
        IO,
        MissingKeys,
        Notifications,
        ProfileControl,
        Search,
        SettingsControl,
        Tasks,
    },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    @import '@enso-ui/themes/bulma/variables';

    .navbar {
        height: $navbar-height;
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
            [dir='ltr'] & {
                margin-left: auto;
            }
            [dir='rtl'] & {
                margin-right: auto;
            }
        }
    }

</style>
