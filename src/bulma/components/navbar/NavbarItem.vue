<template>
    <div :class="['navbar-item has-dropdown', { 'is-active': dropdown }]">
        <a class="navbar-link is-arrowless"
            @click.stop="toggle">
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
        <div class="navbar-dropdown is-right"
            v-click-outside="attemptHide"
            v-if="dropdown">
            <slot/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { clickOutside } from '@enso-ui/directives';
import Loader from '@enso-ui/loader/bulma';

export default {
    name: 'NavbarItem',

    directives: { clickOutside },

    components: { Fa, Loader },

    inject: ['i18n'],

    props: {
        icon: {
            type: [Array, String],
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        manual: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['hide', 'show', 'touchstart'],

    data: () => ({
        dropdown: false,
    }),

    computed: mapState('layout', ['isTouch']),

    methods: {
        attemptHide() {
            if (!this.manual) {
                this.hide();
            }
        },
        hide() {
            this.$emit('hide');
            this.dropdown = false;
        },
        show() {
            this.$emit('show');
            this.dropdown = true;
        },
        toggle() {
            if (this.isTouch) {
                this.$emit('touch');
            } else if (!this.manual) {
                if (this.dropdown) {
                    this.hide();
                } else {
                    this.show();
                }
            }
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
