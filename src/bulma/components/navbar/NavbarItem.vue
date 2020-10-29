<template>
    <core-tasks>
        <a class="navbar-item"
            @click="$emit('touch')"
            v-if="isTouch">
                <slot name="mobile-icon"
                    :icon="icon">
                    <span class="icon">
                        <fa :icon="icon"/>
                    </span>
                </slot>
            <sup class="has-text-danger task-count">
                <slot name="sup"/>
            </sup>
        </a>
        <div v-click-outside="hide"
            :class="[
                'navbar-item',
                { 'has-dropdown': !isTouch },
                { 'is-active': visible }
            ]" v-else>
            <a class="navbar-link is-arrowless"
                @click="$emit('click')">
                <slot name="desktop-icon"
                    :icon="icon">
                    <span class="icon">
                        <fa :icon="icon"/>
                    </span>
                </slot>
                <sup class="has-text-danger task-count">
                    <slot name="sup"/>
                </sup>
                <loader size="small"
                    v-if="loading"/>
            </a>
            <div v-if="visible"
                class="navbar-dropdown is-right">
                <slot/>
            </div>
        </div>
    </core-tasks>
</template>
<script>
import { clickOutside } from '@enso-ui/directives';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faEye, faClock, faFlag, faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { VTooltip } from 'v-tooltip';
import Loader from '@enso-ui/loader/bulma';
import { mapState } from 'vuex';
import CoreTasks from '../../../core/components/navbar/Tasks.vue';

library.add(
    faEye, faTasks, faClock, faFlag,
);

export default {
    name: 'Tasks',

    directives: { clickOutside, tooltip: VTooltip },

    components: { CoreTasks, Loader },

    inject: ['i18n'],

    props: {
        icon: {
            type: String,
            required: true,
        },
        loading: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    data: () => ({
        visible: false,
    }),

    computed: {
        ...mapState('layout', ['isTouch']),
    },

    methods: {
        hide() {
            this.visible = false;
        },
        show() {
            this.visible = true;
        },
        toggle() {
            this.visible = !this.visible;
        },
    },
};

</script>
<style lang="scss" scoped>
sup.task-count {
    font-size: 0.75em;
    margin-top: -10px;
}

div.task-list {
    width: 300px;
    overflow-x: hidden;
    max-height: 400px;
    overflow-y: auto;
}

p.is-task {
    width: 268px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
