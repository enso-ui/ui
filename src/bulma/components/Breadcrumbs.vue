<template>
    <nav class="breadcrumb is-small is-bold has-dot-separator">
        <ul>
            <core-breadcrumbs>
                <template #default="{ breadcrumbs, hasNavigation }">
                    <li v-for="(breadcrumb, index) in breadcrumbs"
                        :key="breadcrumb.name"
                        :class="{ 'is-active': index === breadcrumbs.length - 1 }">
                        <router-link v-if="hasNavigation(breadcrumb)"
                            class="breadcrumb-link"
                            :to="{ name: breadcrumb.route }">
                            {{ i18n(breadcrumb.name) }}
                        </router-link>
                        <span class="breadcrumb-link breadcrumb-current"
                            v-else>
                            {{ i18n(breadcrumb.name) }}
                        </span>
                    </li>
                </template>
            </core-breadcrumbs>
        </ul>
    </nav>
</template>

<script>
import CoreBreadcrumbs from '../../core/components/Breadcrumbs.vue';

export default {
    name: 'Breadcrumbs',

    components: { CoreBreadcrumbs },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    .breadcrumb {
        color: var(--bulma-text-light);

        &.has-dot-separator li + li::before {
            color: var(--bulma-grey-light);
        }

        .breadcrumb-link {
            display: flex;
            align-items: center;
            color: inherit;
            padding: var(--bulma-breadcrumb-item-padding-vertical) var(--bulma-breadcrumb-item-padding-horizontal);
        }

        li:first-child .breadcrumb-link {
            padding-inline-start: 0;
        }

        li.is-active {
            color: var(--bulma-text-strong);
        }
    }
</style>
