<template>
    <core-i-o>
        <template v-slot:default="{
                isTouch, count, imports, exports, hide, toggle, visible
            }">
            <div v-if="count"
                v-click-outside="hide"
                class="navbar-item io"
                :class="[
                    { 'has-dropdown': !isTouch },
                    { 'is-active': visible }
                ]">
                <span class="is-clickable"
                    v-if="isTouch">
                    <span class="icon">
                        <fa icon="sync-alt"
                            spin/>
                    </span>
                    <sup class="has-text-danger operation-count">
                        {{ count || null }}
                    </sup>
                </span>
                <a :class="['navbar-link', { 'rotate': visible }]"
                    @click="toggle"
                    v-else>
                    <span class="icon">
                        <fa icon="sync-alt"
                            spin/>
                    </span>
                    <sup class="has-text-danger operation-count">
                        {{ count || null }}
                    </sup>
                </a>
                <div v-if="visible"
                    class="navbar-dropdown is-right">
                    <div class="operation-list">
                        <a v-for="operation in imports"
                            :key="operation.id"
                            class="navbar-item">
                            <operation :operation="operation"
                                type="in"/>
                        </a>
                        <a v-for="operation in exports"
                            :key="operation.id"
                            class="navbar-item">
                            <operation :operation="operation"
                                type="out"/>
                        </a>
                    </div>
                </div>
            </div>
        </template>
    </core-i-o>
</template>

<script>
import { clickOutside } from '@enso-ui/directives';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSyncAlt, faDatabase, faCaretLeft, faCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import CoreIO from '../../../core/components/navbar/IO.vue';
import Operation from './io/Operation.vue';

library.add(faSyncAlt, faDatabase, faCaretLeft, faCaretRight);

export default {
    name: 'IO',

    directives: { clickOutside },

    components: { CoreIO, Operation },
};
</script>

<style lang="scss">
    sup.operation-count {
        font-size: 0.75em;
        margin-top: -10px;
    }

    div.operation-list {
        width: 300px;
        overflow-x: hidden;
        max-height: 400px;
        overflow-y: auto;
    }

    .navbar-link {
        &:after {
            transform: rotate(135deg);
            transition: transform .300s ease;
        }

        &.rotate:after {
            transform: rotate(-45deg);
        }
    }
</style>
