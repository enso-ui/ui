<template>
    <core-page-header>
        <template v-slot:default="{ routing }">
            <div class="level">
                <div class="level-left is-hidden-mobile">
                    <div class="level-item">
                        <fade-left mode="out-in">
                            <p class="title is-5 page-title"
                                v-if="!routing">
                                {{ i18n($route.meta.title) }}
                            </p>
                        </fade-left>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <fade-right mode="out-in">
                            <breadcrumbs v-if="!routing"/>
                        </fade-right>
                    </div>
                </div>
            </div>
        </template>
    </core-page-header>
</template>

<script>
import { FadeLeft, FadeRight } from '@enso-ui/transitions';
import CorePageHeader from '../../core/components/PageHeader.vue';
import Breadcrumbs from './Breadcrumbs.vue';

export default {
    name: 'PageHeader',

    components: {
        CorePageHeader, FadeLeft, FadeRight, Breadcrumbs,
    },

    inject: ['i18n'],
};
</script>

<style lang="scss" scoped>
    @media screen and (max-width: 768px) {
        .level-left+.level-right {
            margin-top: unset;
        }
    }
</style>
