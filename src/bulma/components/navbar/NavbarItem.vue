<template>
    <a class="navbar-item"
        @click="$emit('touch')"
        v-if="isTouch">
        <slot name="mobile-icon"
            :icon="icon">
                <span class="icon">
                    <fa :icon="icon"/>
                </span>
        </slot>
        <sup class="has-text-danger">
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
                <span :class="[{ 'is-muted': loading }, 'icon']">
                    <fa :icon="icon"/>
                </span>
            </slot>
            <sup>
                <slot name="sup"/>
            </sup>
            <sub>
                <slot name="sub"/>
            </sub>
            <loader size="small"
                v-if="loading"/>
        </a>
        <div v-if="visible"
            class="navbar-dropdown is-right">
            <slot/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { VTooltip } from 'v-tooltip';
import { clickOutside } from '@enso-ui/directives';
import Loader from '@enso-ui/loader/bulma';


export default {
    name: 'Tasks',

    directives: { clickOutside, tooltip: VTooltip },

    components: { Loader },

    inject: ['i18n'],

    props: {
        icon: {
            type: String,
            required: true,
        },
        loading: {
            type: Boolean,
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

<style lang="scss">
.navbar-item {
    sup, sub {
        font-size: 0.75em;
        font-weight: bold;
        right: 8px;
        position: absolute;
    }

    sup {
        top: 8px;
    }

    sub {
        bottom: 8px;
    }
}
</style>
