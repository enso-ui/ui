<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <fade :duration="200"
                mode="out-in"
                v-if="keepAlive">
                <component :is="Component"
                   :key="$route.path"/>
            </fade>
        </keep-alive>
        <fade :duration="200"
            mode="out-in"
            v-if="!keepAlive">
            <component :is="Component"
               :key="$route.path"/>
        </fade>
    </router-view>
</template>

<script>
import { Fade } from '@enso-ui/transitions';

export default {
    name: 'MainRouter',

    components: {
        Fade,
    },

    computed: {
        keepAlive() {
            return this.$route.meta?.keepAlive;
        },
    },
};
</script>
