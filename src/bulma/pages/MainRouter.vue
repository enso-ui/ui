<template>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component"
                class="animated fadeIn"
                :key="$route.path"
                v-if="keepAlive"/>
        </keep-alive>
        <component :is="Component"
            class="animated fadeIn"
            :key="$route.path"
            v-if="!keepAlive"/>
    </router-view>
</template>

<script>
export default {
    name: 'MainRouter',

    computed: {
        keepAlive() {
            return this.$route.meta?.keepAlive;
        },
    },
};
</script>
