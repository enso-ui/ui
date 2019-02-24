<template>
    <fade mode="out-in">
        <router-view :key="$route.name"/>
    </fade>
</template>

<script>
import { Fade } from '@enso-ui/transitions';

export default {
    components: { Fade },
};
</script>
