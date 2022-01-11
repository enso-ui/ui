<template>
    <core-page-header>
        <template #default="{ pageTitle }">
            <div class="level">
                <div class="level-left is-hidden-mobile">
                    <div class="level-item">
                        <fade>
                            <p class="title is-5 page-title">
                                {{ i18n(pageTitle) }}
                            </p>
                        </fade>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <fade>
                            <breadcrumbs/>
                        </fade>
                    </div>
                </div>
            </div>
        </template>
    </core-page-header>
</template>

<script>
import { Fade } from '@enso-ui/transitions';
import CorePageHeader from '../../core/components/PageHeader.vue';
import Breadcrumbs from './Breadcrumbs.vue';

export default {
    name: 'PageHeader',

    components: { Breadcrumbs, CorePageHeader, Fade },

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
