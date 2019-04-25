<template>
    <core-operation v-bind="$attrs">
        <template v-slot:default="{ operation, since, isIn, avatar }">
            <div class="navbar-content">
                <div class="is-operation">
                    <div class="level is-marginless">
                        <div class="level-left">
                            <div class="level-item">
                                <figure v-tooltip.left-start="operation.owner.name"
                                    class="media">
                                    <p class="image is-16x16">
                                        <img class="is-rounded"
                                            :src="avatar(operation.owner)">
                                    </p>
                                </figure>
                                <span v-tooltip.left-start="
                                        `${i18n('file')}: ${operation.name}, ${i18n('elapsed time')}: ${since(operation.since)}`
                                    "
                                    class="icon is-small has-text-info has-margin-left-small">
                                    <fa icon="database"/>
                                </span>
                                <span :class="[
                                        'icon is-small has-text-danger',
                                        {'animated flash infinite slower': operation.entries > 0}
                                    ]">
                                    <fa :icon="['fas', isIn ? 'caret-left' : 'caret-right']"
                                        transform="shrink-1"/>
                                </span>
                                <span class="has-margin-left-small">
                                    {{ operation.name }}
                                </span>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <span class="is-bold has-text-success">
                                    {{ operation.entries | shortNumber }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </core-operation>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDatabase, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { VTooltip } from 'v-tooltip';
import CoreOperation from '../../../../core/components/navbar/io/Operation.vue';

library.add(faDatabase, faCaretLeft, faCaretRight);

export default {
    name: 'Operation',

    directives: { tooltip: VTooltip },

    components: { CoreOperation },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    div.is-operation {
        white-space: normal;
        width: 268px;
        overflow-x: hidden;

        .level-left {
            max-width: 75%;
            overflow: hidden;
        }
    }
</style>
