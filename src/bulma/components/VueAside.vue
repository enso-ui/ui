<template>
    <div class="aside">
        <slot/>
    </div>
</template>

<script>
export default {
    name: 'VueAside',
};
</script>

<style lang="scss">
    @import '@enso-ui/themes/bulma/variables';

    .aside {
        position: fixed;
        bottom: 0;
        top: $navbar-height;
        padding-top: 20px;
        padding-bottom: 20px;
        width: $sidebar-width;
        font-size: 1em;
        font-family: $family-secondary;
        max-height: 100vh;
        z-index: 2;
        -webkit-box-shadow: 0 1px 1px hsla(0,0%,4%,.65);
        box-shadow: 0 1px 1px hsla(0,0%,4%,.65);
    }
</style>
