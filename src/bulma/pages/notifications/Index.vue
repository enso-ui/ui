<template>
    <div class="columns is-centered">
        <div class="column is-two-thirds-desktop">
            <div class="level is-mobile">
                <div class="level-item"
                    v-if="notifications.length">
                    <a class="button is-success is-outlined"
                        @click="readAll">
                        <span>{{ i18n("Mark all read") }}</span>
                        <span class="icon is-small">
                            <fa icon="check"/>
                        </span>
                    </a>
                </div>
                <div class="level-item">
                    <a :class="['button animated fadeIn', {'is-loading': loading}]"
                        @click="fetch">
                        <span>{{ i18n('Reload') }}</span>
                        <span class="icon is-small">
                            <fa icon="sync"/>
                        </span>
                    </a>
                </div>
                <div class="level-item is-marginless"
                    v-if="notifications.length">
                    <a class="button is-warning is-outlined has-margin-left-small"
                        @click="destroyAll">
                        <span>{{ i18n("Clear all") }}</span>
                        <span class="icon is-small">
                            <fa icon="trash-alt"/>
                        </span>
                    </a>
                </div>
            </div>
            <transition-group tag="ul"
                enter-active-class="fadeIn"
                leave-active-class="fadeOut">
                <li class="animated"
                    v-for="(notification, index) in notifications"
                    :key="notification.id">
                    <div class="box has-background-light has-padding-medium has-margin-bottom-small"
                        :class="{'is-bold': !notification.read_at}">
                        <fa :icon="notification.data.icon"
                            v-if="notification.data.icon"/>
                        <span :class="[
                                'is-clickable', {
                                    'has-text-info':
                                        notification.data.path
                                        && notification.data.path !== '#'
                                }
                            ]"
                            @click="read(notification)">
                            {{ notification.data.body }}
                        </span>
                        <span class="is-pulled-right">
                            <span class="icon is-small">
                                <fa icon="clock"
                                    size="xs"/>
                            </span>
                            {{ timeFromNow(notification.created_at) }}
                            <a class="delete has-margin-left-medium is-medium"
                                @click="destroy(notification, index)"/>
                        </span>
                        <span class="is-clearfix"/>
                    </div>
                </li>
            </transition-group>
            <h4 class="title is-5 has-text-centered"
                v-if="!loading && !notifications.length">
                {{ i18n("You don't have any notifications") }}
            </h4>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faClock, faBell, faCheck, faTrashAlt, faSpinner, faSync,
} from '@fortawesome/free-solid-svg-icons';
import format from '@core-modules/plugins/date-fns/format';
import formatDistance from '@core-modules/plugins/date-fns/formatDistance';

library.add(faClock, faBell, faCheck, faTrashAlt, faSpinner, faSync);

export default {
    name: 'Index',

    inject: ['errorHandler', 'i18n', 'route'],

    data: () => ({
        paginate: 200,
        notifications: [],
        offset: 0,
        loading: false,
    }),

    computed: {
        ...mapState(['user', 'meta']),
        ...mapState('layout', ['isTouch']),
    },

    created() {
        this.fetch = debounce(this.fetch, 500);
        this.fetch();
    },

    methods: {
        fetch() {
            if (this.loading) {
                return;
            }

            this.loading = true;

            axios.get(this.route('core.notifications.index'), {
                params: { offset: this.offset, paginate: this.paginate },
            }).then(({ data }) => {
                this.notifications = this.offset ? this.notifications.concat(data) : data;
                this.offset = this.notifications.length;
                this.loading = false;
            }).catch(this.errorHandler);
        },
        read(notification) {
            axios.patch(this.route('core.notifications.read', notification.id))
                .then(({ data }) => {
                    notification.read_at = data.read_at;
                    this.$root.$emit('read-notification', notification);

                    if (notification.data.path && notification.data.path !== '#') {
                        this.$this.router.push({ path: notification.data.path });
                    }
                }).catch(this.errorHandler);
        },
        readAll() {
            axios.post(this.route('core.notifications.readAll'))
                .then(() => this.updateAll())
                .catch(this.errorHandler);
        },
        updateAll() {
            this.notifications.forEach((notification) => {
                notification.read_at = notification.read_at || format(new Date(), 'Y-MM-DD H:mm:s');
            });

            this.unreadCount = 0;

            this.$root.$emit('read-all-notifications');
        },
        destroyAll() {
            axios.post(this.route('core.notifications.destroyAll')).then(() => {
                this.notifications = [];
                this.$root.$emit('destroy-all-notifications');
            }).catch(this.errorHandler);
        },
        destroy(notification, index) {
            axios.delete(this.route('core.notifications.destroy', notification.id)).then(() => {
                this.notifications.splice(index, 1);
                this.$root.$emit('destroy-notification', notification);
            }).catch(this.errorHandler);
        },
        timeFromNow(date) {
            return formatDistance(date);
        },
    },
};
</script>
