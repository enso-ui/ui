<template>
    <div class="columns is-multiline"
        v-if="logs.length > 0">
        <div class="column is-one-third-widescreen is-half-desktop is-full-tablet"
            v-for="(log, index) in logs"
            :key="index">
            <card class="is-rounded raises-on-hover"
                collapsible
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
                                :href="route('system.logs.download', log.name)">
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
                        <card-refresh @refresh="fetch"/>
                        <card-collapse/>
                    </template>
                </card-header>
                <card-content class="has-padding-large">
                    <p>
                        <span>{{ i18n("Last updated") }}</span>
                        <span class="is-pulled-right">
                            {{ timeFromNow(log.modified) }}
                        </span>
                    </p>
                    <p>
                        <span>{{ i18n("Size") }}</span>
                        <span class="is-pulled-right">
                            {{ log.size }} {{ i18n("MB") }}
                        </span>
                    </p>
                </card-content>
            </card>
        </div>
    </div>
    <p class="subtitle is-4 has-text-centered has-margin-top-large"
        v-else>
        {{ i18n('No log files available') }}
    </p>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTerminal, faEye, faCloudDownloadAlt, faTrashAlt, faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
    Card, CardHeader, CardContent, CardControl, CardRefresh, CardCollapse, Confirmation,
} from '@enso-ui/bulma';
import formatDistance from '../../../../modules/plugins/date-fns/formatDistance';

library.add(faTerminal, faEye, faCloudDownloadAlt, faTrashAlt, faSyncAlt);

export default {
    name: 'Index',

    inject: ['errorHandler', 'i18n', 'route'],

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
            axios.get(this.route('system.logs.index')).then(({ data }) => {
                this.logs = data;
                this.loading = false;
            }).catch(this.errorHandler);
        },
        empty(log) {
            axios.delete(this.route('system.logs.destroy', log.name)).then(({ data }) => {
                const index = this.logs.findIndex(item => log.name === item.name);
                this.logs.splice(index, 1, data.log);
                this.$toastr.success(data.message);
            }).catch(this.errorHandler);
        },
        timeFromNow(date) {
            return formatDistance(date);
        },
    },
};
</script>
