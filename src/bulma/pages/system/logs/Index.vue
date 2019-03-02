<template>
    <div class="columns is-multiline">
        <div class="column is-one-third-widescreen is-half-desktop is-full-tablet"
            v-for="(log, index) in logs"
            :key="index">
            <card class="is-rounded raises-on-hover"
                :loading="loading">
                <card-header class="has-background-light">
                    <span class="icon is small">
                        <fa :icon="icon"/>
                    </span>
                    <template v-slot:title>
                        {{ log.name }}
                    </template>
                    <template v-slot:controls>
                        <card-control
                            v-if="log.visible">
                            <span class="icon is-small has-text-success"
                                @click="$router.push({
                                    name: 'system.logs.show',
                                    params: { log: log.name }
                                })">
                                <fa icon="eye"/>
                            </span>
                        </card-control>
                        <card-control>
                            <a class="icon is-small has-text-info"
                                :href="getDownloadLink(log.name)">
                                <fa icon="cloud-download-alt"/>
                            </a>
                        </card-control>
                        <card-control>
                            <confirmation placement="bottom"
                                @confirm="empty(log)">
                                <span class="icon is-small has-text-danger">
                                    <fa icon="trash-alt"/>
                                </span>
                            </confirmation>
                        </card-control>
                        <card-refresh class="has-text-success"
                            @refresh="fetch"/>
                        <card-collapse/>
                    </template>
                </card-header>
                <card-content>
                    <div class="has-padding-large">
                        <p>
                            <span>{{ __("Last updated") }}</span>
                            <span class="is-pulled-right">
                                {{ timeFromNow(log.modified.date) }}
                            </span>
                        </p>
                        <p>
                            <span>{{ __("Size") }}</span>
                            <span class="is-pulled-right">
                                {{ log.size }} {{ __("MB") }}
                            </span>
                        </p>
                    </div>
                </card-content>
            </card>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTerminal, faEye, faCloudDownloadAlt, faTrashAlt, faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
    Card, CardHeader, CardContent, CardControl, CardRefresh, CardCollapse, Confirmation,
} from '@enso-ui/bulma';
import formatDistance from '@core-modules/plugins/date-fns/formatDistance';

library.add(faTerminal, faEye, faCloudDownloadAlt, faTrashAlt, faSyncAlt);

export default {
    name: 'Index',

    components: {
        Card, CardHeader, CardContent, CardControl, CardRefresh, CardCollapse, Confirmation,
    },

    data: () => ({
        logs: [],
        loading: false,
    }),

    computed: {
        icon() {
            return faTerminal;
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            this.loading = true;
            axios.get(route('system.logs.index')).then(({ data }) => {
                this.logs = data;
                this.loading = false;
            }).catch(error => this.handleError(error));
        },
        empty(log) {
            axios.delete(route('system.logs.destroy', log.name)).then(({ data }) => {
                const index = this.logs.findIndex(item => log.name === item.name);
                this.logs.splice(index, 1, data.log);
                this.$toastr.success(data.message);
            }).catch(error => this.handleError(error));
        },
        getDownloadLink(log) {
            return route('system.logs.download', log);
        },
        timeFromNow(date) {
            return formatDistance(date);
        },
    },
};
</script>
