<template>
    <article class="message">
        <div class="message-header"
            v-if="log">
            <p>
                {{ i18n("The log file") }}
                <code>{{ log.name }}</code>
                {{ i18n("was last updated") }}
                {{ log.modified ? timeFromNow(log.modified.date) : null }}.
                {{ i18n("Current file size is") }} {{ log.size }} {{ i18n("MB") }}
            </p>
            <button class="delete"
                @click="$router.push({ name: 'system.logs.index' })"/>
        </div>
        <div class="message-body"
            v-if="log">
            <pre v-hljs>
                <code class="php">
{{ log.content || i18n('The log file is empty') }}
                </code>
            </pre>
        </div>
    </article>
</template>

<script>
import { hljs } from '@enso-ui/directives';
import formatDistance from '@core-modules/plugins/date-fns/formatDistance';

export default {
    name: 'Show',

    inject: ['errorHandler', 'i18n'],

    directives: { hljs },

    data: () => ({
        log: null,
        content: null,
    }),

    created() {
        axios.get(route('system.logs.show', this.$route.params.log))
            .then(({ data }) => {
                this.log = data;
            }).catch(this.errorHandler);
    },

    methods: {
        timeFromNow(date) {
            return formatDistance(date);
        },
    },
};
</script>

<style src="highlight.js/styles/atom-one-light.css"></style>
