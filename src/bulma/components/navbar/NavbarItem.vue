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
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { clickOutside } from '@enso-ui/directives';
import Loader from '@enso-ui/loader/bulma';
import { layout } from '../../../pinia/layout';

export default {
    name: 'NavbarItem',

    directives: { clickOutside },

    components: { Fa, Loader },

    inject: ['i18n'],

    props: {
        icon: {
            type: [Array, Object, String],
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
            if (layout().isTouch) {
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
        font-size: 0.625rem;
        font-weight: 600;
        right: 8px;
        position: absolute;
    }

    sup {
        top: 8px;
    }

    sub {
        bottom: 8px;
    }

    .navbar-link,
    > .navbar-item {
        transition: background-color 0.15s ease, color 0.15s ease;
    }

    .navbar-dropdown {
        background-color: var(--bulma-navbar-dropdown-background-color);
        border: 1px solid var(--bulma-border);
        box-shadow: none;
        overflow: hidden;
    }

    .navbar-dropdown .navbar-item,
    .navbar-dropdown .level.navbar-item {
        background-color: transparent;
    }

    .navbar-dropdown .navbar-item:hover,
    .navbar-dropdown .navbar-item:focus,
    .navbar-dropdown .navbar-item.is-active,
    .navbar-dropdown .level.navbar-item:hover,
    .navbar-dropdown .level.navbar-item:focus {
        background-color: var(--bulma-scheme-main-ter);
        color: var(--bulma-text-strong);
    }

    .navbar-divider {
        background-color: var(--bulma-border);
    }
}
</style>
