<template>
    <div class="wrapper">
        <div class="has-text-centered"
            v-if="!ready && loading">
            <h4 class="title is-4 has-text-centered">
                {{ i18n('Loading') }}
                <span class="icon is-small has-margin-left-medium">
                    <fa icon="spinner"
                        size="xs"
                        spin/>
                </span>
            </h4>
        </div>
        <div class="columns is-reverse-mobile">
            <div class="column is-two-thirds">
                <timeline class="raises-on-hover"
                    :feed="feed"
                    :loading="loading"
                    @load-more="fetch()"/>
            </div>
            <div class="column is-one-third">
                <button class="button is-fullwidth"
                    :class="{ 'is-loading': loading }"
                    @click="reload()">
                    <span>
                        {{ i18n('Reload') }}
                    </span>
                    <span class="icon">
                        <fa icon="sync-alt"/>
                    </span>
                </button>
                <enso-date-filter class="box raises-on-hover has-margin-top-large"
                    value="today"
                    @update="filters.interval = $event"/>
                <div class="box has-padding-medium raises-on-hover has-background-light">
                    <p class="has-text-centered">
                        <strong>{{ i18n('What') }}</strong>
                    </p>
                    <select-filter multiple
                        source="system.roles.options"
                        :placeholder="i18n('Roles')"
                        v-model="filters.roleIds"/>
                    <select-filter multiple
                        source="administration.users.options"
                        label="person.name"
                        :placeholder="i18n('Authors')"
                        v-model="filters.userIds"/>
                    <select-filter multiple
                        :options="actions"
                        :placeholder="i18n('Events')"
                        v-model="filters.events"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { EnsoDateFilter, EnsoSelectFilter as SelectFilter } from '@enso-ui/bulma';
import Timeline from './components/Timeline.vue';

library.add(faSpinner);

export default {
    name: 'Index',

    inject: ['errorHandler', 'i18n', 'route'],

    components: { Timeline, EnsoDateFilter, SelectFilter },

    data: () => ({
        ready: false,
        loading: false,
        axiosRequest: null,
        feed: [],
        offset: 0,
        actions: [
            { name: 'Created', id: 1 },
            { name: 'Updated', id: 2 },
            { name: 'Deleted', id: 3 },
            { name: 'Custom', id: 4 },
        ],
        filters: {
            userIds: [],
            roleIds: [],
            interval: {
                min: null,
                max: null,
            },
            events: [],
        },
    }),

    computed: {
        ...mapGetters('preferences', { locale: 'lang' }),
    },

    watch: {
        filters: {
            handler() {
                this.reload();
            },
            deep: true,
        },
    },

    methods: {
        fetch() {
            this.loading = true;

            if (this.axiosRequest) {
                this.axiosRequest.cancel();
            }

            this.axiosRequest = axios.CancelToken.source();

            axios.get(this.route('core.activityLogs.index'), {
                params: { offset: this.offset, filters: this.filters },
                cancelToken: this.axiosRequest.token,
            }).then(({ data }) => {
                const length = this.length(data);

                if (this.offset === 0) {
                    this.feed = data;
                } else {
                    this.merge(data);
                }

                this.offset += length;
                this.loading = false;
                this.ready = true;
            }).catch((error) => {
                if (axios.isCancel(error)) {
                    this.axiosRequest = null;
                    return;
                }

                this.errorHandler(error);
            });
        },
        reload() {
            this.offset = 0;
            this.fetch();
        },
        length(feed) {
            return feed.reduce((total, { list }) => (total += list.length), 0);
        },
        merge(feed) {
            if (!feed.length) {
                return;
            }

            if (this.feed[this.feed.length - 1].date === feed[0].date) {
                this.feed[this.feed.length - 1].list.push(...feed.shift().list);
            }

            this.feed.push(...feed);
        },
    },
};
</script>
