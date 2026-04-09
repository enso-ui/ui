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
        max-height: 100vh;
        z-index: 4;
        background: var(--enso-shell-surface);
        border-right: 1px solid var(--bulma-border);
    }
</style>
