<template>
    <router-view :key="$route.path"/>
</template>

<script>
export default {
    name: 'Router',
};
</script>
