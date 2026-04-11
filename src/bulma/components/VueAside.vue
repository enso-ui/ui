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
    .aside {
        position: fixed;
        bottom: 0;
        top: var(--bulma-navbar-height);
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        width: var(--enso-sidebar-width);
        font-size: 0.95em;
        font-family: var(--bulma-family-secondary, var(--bulma-family-primary));
        max-height: 100vh;
        z-index: 2;
        background: var(--enso-shell-surface);
        -webkit-box-shadow: 0 1px 1px hsla(0, 0%, 4%, .65);
        box-shadow: 0 1px 1px hsla(0, 0%, 4%, .65);
    }
</style>
