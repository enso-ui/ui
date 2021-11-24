<template>
    <base-root>
        <template #default="{ isAuth, home, direction }">
            <div id="app"
                :dir="direction">
                <document-title/>
                <loader/>
                <fade mode="out-in">
                    <auth v-if="!isAuth"/>
                    <home v-else-if="home"/>
                    <default v-else/>
                </fade>
            </div>
        </template>
    </base-root>
</template>

<script>
import { Fade } from '@enso-ui/transitions';
import Auth from '@enso-ui/auth/src/bulma/layouts/Auth.vue';
import BaseRoot from '../core/Root.vue';
import DocumentTitle from '../core/components/DocumentTitle.vue';
import Loader from './components/Loader.vue';
import Home from './layouts/Home.vue';
import Default from './layouts/Default.vue';

export default {
    name: 'Root',

    components: {
        BaseRoot, DocumentTitle, Loader, Fade, Auth, Home, Default,
    },
};
</script>
