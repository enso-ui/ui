<template>
    <core-notifications>
        <template v-slot:default="{
                notifications, loading, unread, total,
                fetch, read, readAll, timeFromNow, notificationsEvents
            }">
            <navbar-item icon="bell"
                :loading="loading"
                @click="$refs.navbarItem.toggle(); fetch()"
                @touch="$router.push({'name': 'core.notifications.index'})"
                ref="navbarItem">
                <template v-slot:sup>
                    {{ unread || null }}
                </template>
                <template v-slot:default>
                    <div>
                        <div class="notification-list"
                            v-on="notificationsEvents">
                            <a v-for="notification in notifications"
                                :key="notification.id"
                                class="navbar-item"
                                @click="read(notification)">
                                <div class="navbar-content">
                                    <p class="is-notification"
                                        :class="{
                                            'has-text-grey-light': notification.read_at,
                                            'is-bold': !notification.read_at,
                                        }">
                                        <fa v-if="notification.data.icon"
                                            :icon="notification.data.icon"/>
                                        {{ notification.data.body }}
                                    </p>
                                    <p>
                                        <small :class="{
                                            'has-text-grey-light': notification.read_at,
                                            'has-text-info': !notification.read_at,
                                        }">
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
                                        $refs.navbarItem.hide();
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
                </template>
            </navbar-item>
        </template>
    </core-notifications>
</template>

<script>

import { clickOutside } from '@enso-ui/directives';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBell, faCheck, faEye, faCogs, faQuestion, faEnvelope, faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import CoreNotifications from '../../../core/components/navbar/Notifications.vue';
import NavbarItem from './NavbarItem.vue';

library.add(faBell, faCheck, faEye, faCogs, faQuestion, faEnvelope, faFileExcel);

export default {
    name: 'Notifications',

    directives: { clickOutside },

    components: { CoreNotifications, NavbarItem },

    inject: ['i18n'],
};

</script>

<style lang="scss" scoped>
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
</style>
