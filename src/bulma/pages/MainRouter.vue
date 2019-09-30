<template>
    <div>
        <keep-alive>
            <router-view class="animated fadeIn"
                :key="$route.path"
                v-if="keepAlive"/>
        </keep-alive>
        <router-view class="animated fadeIn"
            :key="$route.path"
            v-if="!keepAlive"/>
    </div>
</template>

<script>
export default {
    name: 'MainRouter',

    computed: {
        keepAlive() {
            return this.$route.meta && this.$route.meta.keepAlive;
        },
    },
};
</script>
