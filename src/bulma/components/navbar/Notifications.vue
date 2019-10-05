<template>
    <core-notifications>
        <template v-slot:default="{
                notifications, loading, isTouch, visible , unread, total,
                toggle, hide, read, readAll, timeFromNow, notificationsEvents
            }">
            <div v-click-outside="hide"
                :class="[
                    'navbar-item notifications',
                    { 'has-dropdown': !isTouch },
                    { 'is-active': visible }
                ]">
                <span class="is-clickable"
                    @click="$router.push({'name': 'core.notifications.index'})"
                    v-if="isTouch">
                    <span class="icon">
                        <fa icon="bell"/>
                    </span>
                    <sup class="has-text-danger notification-count">
                        {{ unread || null }}
                    </sup>
                </span>
                <a :class="['navbar-link', { 'rotate': visible }]"
                    @click="toggle()"
                    v-else>
                    <span class="icon">
                        <fa icon="bell"/>
                    </span>
                    <sup class="has-text-danger notification-count">
                        {{ unread || null }}
                    </sup>
                    <loader size="small"
                        v-if="loading"/>
                </a>
                <div v-if="visible"
                    class="navbar-dropdown is-right">
                    <div class="notification-list"
                        v-on="notificationsEvents">
                        <a v-for="notification in notifications"
                            :key="notification.id"
                            class="navbar-item"
                            @click="read(notification)">
                            <div class="navbar-content">
                                <p class="is-notification":class="notification.read_at ? 'has-text-grey-light': 'is-bold'">
                                    <fa v-if="notification.data.icon"
                                        :icon="notification.data.icon"/>
                                    {{ notification.data.body }}
                                </p>
                                <p>
                                    <small :class="notification.read_at ? 'has-text-grey-light': 'has-text-info'">
                                        {{ timeFromNow(notification.created_at) }}
                                    </small>
                                </p>
                            </div>
                        </a>
                    </div>
                    <hr v-if="notifications.length"
                        class="navbar-divider">
                    <nav v-if="notifications.length"
                        class="level navbar-item">
                        <div class="level-left">
                            <div class="level-item">
                                <a class="button is-small is-info has-margin-left-small"
                                    @click="
                                        hide();
                                        $router.push({'name': 'core.notifications.index'})
                                    ">
                                    <span>{{ i18n("See all") }}</span>
                                    <span class="icon is-small">
                                        <fa icon="eye"/>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <a class="button is-small is-success"
                                    @click="readAll">
                                    <span>{{ i18n("Mark all as read") }}</span>
                                    <span class="icon is-small">
                                        <fa icon="check"/>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </nav>
                    <a v-else class="navbar-item">
                        <span v-if="unread || loading">
                            {{ i18n("Loading...") }}
                        </span>
                        <span v-else-if="!unread">
                            {{ i18n("You don't have any notifications") }}
                        </span>
                    </a>
                </div>
            </div>
        </template>
    </core-notifications>
</template>

<script>

import { clickOutside } from '@enso-ui/directives';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBell, faCheck, faEye, faCogs, faQuestion, faEnvelope, faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import Loader from '@enso-ui/loader/bulma';
import CoreNotifications from '../../../core/components/navbar/Notifications.vue';

library.add(faBell, faCheck, faEye, faCogs, faQuestion, faEnvelope, faFileExcel);

export default {
    name: 'Notifications',

    directives: { clickOutside },

    components: { CoreNotifications, Loader },

    inject: ['i18n'],
};

</script>

<style lang="scss" scoped>

    sup.notification-count {
        font-size: 0.75em;
        margin-top: -10px;
    }

    div.notification-list {
        width: 300px;
        overflow-x: hidden;
        max-height: 400px;
        overflow-y: auto;
    }

    p.is-notification {
        white-space: normal;
        width: 268px;
        overflow-x: hidden;
    }

    .navbar-link {
        &:after {
            transform: rotate(135deg);
            transition: transform .300s ease;
        }

        &.rotate:after {
            transform: rotate(-45deg);
        }
    }

</style>
