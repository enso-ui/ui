<template>
    <pull-to-refresh
        :config="config"
        :on-refresh="refresh">
        <slide enter="down"
            leave="up">
            <navbar/>
        </slide>
    </pull-to-refresh>
</template>

<script>
import { Slide } from '@enso-ui/transitions';
import PullToRefresh from '@enso-ui/pull-to-refresh';
import Navbar from './Navbar.vue';

export default {
    name: 'NavbarRefresh',

    components: {
        Slide, PullToRefresh, Navbar,
    },

    inject: ['i18n'],

    data: v => ({
        config: {
            startLabel: v.i18n('Pull down to refresh'),
            readyLabel: v.i18n('Release to refresh'),
            loadingLabel: v.i18n('Refreshing...'),
            errorLabel: v.i18n('Something wrong happened'),
        },
    }),

    methods: {
        refresh() {
            return new Promise(() => window.location.reload(true));
        },
    },
};
</script>

<style>
    .pull-down-header {
        z-index: 1000;
    }
</style>
