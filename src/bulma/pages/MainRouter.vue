<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component"
                class="animate__animated animate__fadeIn"
                :key="$route.path"
                v-if="keepAlive"/>
        </keep-alive>
        <component :is="Component"
            class="animate__animated animate__fadeIn"
            :key="$route.path"
            v-if="!keepAlive"/>
    </router-view>
</template>

<script>
import 'animate.css';
export default {
    name: 'MainRouter',

    computed: {
        keepAlive() {
            return this.$route.meta?.keepAlive;
        },
    },
};
</script>
