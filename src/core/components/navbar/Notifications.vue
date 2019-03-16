<script>
import debounce from 'lodash/debounce';
import { mapState } from 'vuex';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import Favico from 'favico.js';
import format from '@core-modules/plugins/date-fns/format';
import formatDistance from '@core-modules/plugins/date-fns/formatDistance';

export default {
    name: 'Notifications',

    inject: ['errorHandler'],

    props: {
        favicoAnimation: {
            type: String,
            default: 'popFade',
        },
        paginate: {
            type: Number,
            default: 200,
        },
    },

    data: v => ({
        favico: new Favico({
            animation: v.favicoAnimation,
        }),
        notifications: [],
        unread: 0,
        total: 0,
        needsUpdate: true,
        offset: 0,
        loading: false,
        echo: null,
        visible: false,
        desktopNotifications: false,
    }),

    computed: {
        ...mapState(['user', 'meta']),
        ...mapState('layout', ['isTouch']),
    },

    watch: {
        unread(unread) {
            this.favico.badge(unread);
        },
    },

    created() {
        this.fetch = debounce(this.fetch, 500);
        this.initEcho();
        this.initDesktopNotification();
        this.count();
        this.addBusListeners();
        this.listen();
    },

    methods: {
        toggle() {
            this.visible = !this.visible;

            if (this.visible) {
                this.fetch();
            }
        },
        hide() {
            this.visible = false;
        },
        count() {
            axios.get(route('core.notifications.count'))
                .then(({ data }) => (this.unread = data.count))
                .catch(this.errorHandler);
        },
        fetch() {
            if (!this.needsUpdate || this.loading) {
                return;
            }

            this.loading = true;

            axios.get(route('core.notifications.index'), {
                params: { offset: this.offset, paginate: this.paginate },
            }).then(({ data }) => {
                this.notifications = this.offset ? this.notifications.concat(data) : data;
                this.offset = this.notifications.length;
                this.needsUpdate = false;
                this.loading = false;
            }).catch(this.errorHandler);
        },
        read(notification) {
            axios.patch(route('core.notifications.read', notification.id))
                .then(({ data }) => {
                    this.unread = Math.max(--this.unread, 0);
                    notification.read_at = data.read_at;

                    if (notification.data.path !== '#') {
                        this.$router.push({ path: notification.data.path });
                    }
                }).catch(this.errorHandler);
        },
        readAll() {
            axios.post(route('core.notifications.readAll'))
                .then(this.updateAll)
                .catch(this.errorHandler);
        },
        updateAll() {
            this.notifications
                .filter(notification => !notification.read_at)
                .forEach(notification => (notification.read_at = this.now()));

            this.unread = 0;
        },
        initEcho() {
            this.echo = new Echo({
                broadcaster: 'pusher',
                key: this.meta.pusher.key,
                cluster: this.meta.pusher.options.cluster,
                encrypted: this.meta.pusher.options.encrypted,
                namespace: 'App.Events',
            });
        },
        initDesktopNotification() {
            if (!('Notification' in window) || Notification.permission === 'denied') {
                return;
            }

            if (Notification.permission === 'granted') {
                this.desktopNotifications = true;
                return;
            }

            Notification.requestPermission((permission) => {
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                this.desktopNotifications = permission === 'granted';
            });
        },
        listen() {
            const self = this;

            this.echo.private(`App.User.${this.user.id}`)
                .notification(({ level, body, title }) => {
                    self.unread++;
                    self.needsUpdate = true;
                    self.offset = 0;

                    if (!document.hidden) {
                        this.$toastr.title(title)[level](body);
                        return;
                    }

                    if (this.desktopNotifications) {
                        const notification = new Notification(title, { body });
                        notification.onclick = () => (window.focus());
                        window.navigator.vibrate(500);
                    }
                });
        },
        computeScrollPosition(event) {
            const a = event.target.scrollTop;
            const b = event.target.scrollHeight - event.target.clientHeight;

            if (a / b > 0.7) {
                this.needsUpdate = true;
                this.fetch();
            }
        },
        addBusListeners() {
            this.$root.$on('read-notification', (notification) => {
                this.unread = Math.max(--this.unread, 0);
                const existing = this.notifications
                    .find(({ id }) => id === notification.id);

                if (existing) {
                    existing.read_at = notification.read_at;
                }
            });

            this.$root.$on('read-all-notifications', () => this.updateAll());

            this.$root.$on('destroy-notification', (notification) => {
                if (!notification.read_at) {
                    this.unread = Math.max(--this.unread, 0);
                }

                const index = this.notifications
                    .findIndex(({ id }) => id === notification.id);

                if (index >= 0) {
                    this.notifications.splice(index, 1);
                }
            });

            this.$root.$on('destroy-all-notifications', () => {
                this.notifications = [];
                this.unread = 0;
            });
        },
        timeFromNow(date) {
            return formatDistance(date);
        },
        now() {
            return format(new Date());
        },
    },

    render() {
        return this.$scopedSlots.default({
            notifications: this.notifications,
            loading: this.loading,
            isTouch: this.isTouch,
            visible: this.visible,
            unread: this.unread,
            total: this.total,
            toggle: this.toggle,
            hide: this.hide,
            timeFromNow: this.timeFromNow,
            read: this.read,
            readAll: this.readAll,
            notificationsEvents: {
                scroll: e => this.computeScrollPosition(e),
            },
        });
    },
};
</script>
