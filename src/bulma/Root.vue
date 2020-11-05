<template>
    <core-app>
        <template v-slot:default="{ isAuth, home, direction }">
            <div id="app"
                :dir="direction">
                <document-title/>
                <loader/>
                <fade>
                    <auth v-if="!isAuth"/>
                    <home v-else-if="home"/>
                    <default v-else/>
                </fade>
            </div>
        </template>
    </core-app>
</template>

<script>
import { Fade } from '@enso-ui/transitions';
import CoreApp from '../core/App.vue';
import DocumentTitle from '../core/components/DocumentTitle.vue';
import Loader from './components/Loader.vue';
import Auth from './layouts/Auth.vue';
import Home from './layouts/Home.vue';
import Default from './layouts/Default.vue';

export default {
    name: 'Root',

    components: {
        CoreApp, DocumentTitle, Loader, Fade, Auth, Home, Default,
    },
};
</script>
