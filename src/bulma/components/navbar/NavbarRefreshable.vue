<template>
    <vue-pull-refresh
        :config="config"
        :on-refresh="refresh">
        <navbar class="animated slideInDown"/>
    </vue-pull-refresh>
</template>

<script>

import VuePullRefresh from "vue-pull-refresh";
import Navbar from "@enso-ui/ui/src/bulma/components/navbar/Navbar";

export default {
    name: 'NavbarRefreshable',

    components: {
        VuePullRefresh, Navbar
    },

    inject: ['i18n'],

    computed: {
        config() {
            return {
                startLabel: this.i18n('Pull down to refresh'),
                readyLabel: this.i18n('Release to refresh'),
                loadingLabel: this.i18n('Refreshing...'),
                errorLabel: this.i18n('Something wrong happened'),
            }
        }
    },
    methods: {
        refresh() {
            return new Promise(function (resolve, reject) {
                window.location.reload(true);
            });
        },
    }
};
</script>

<style>
    .pull-down-header {
        z-index: 1000;
    }
</style>
