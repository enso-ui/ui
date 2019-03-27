<template>
    <fade mode="out-in">
        <router-view/>
    </fade>
</template>

<script>
import { Fade } from '@enso-ui/transitions';

export default {
    name: 'Router',

    components: { Fade },
};
</script>
