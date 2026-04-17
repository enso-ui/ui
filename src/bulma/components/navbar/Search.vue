<template>
    <core-search>
        <template #default="{
                hide, selected, tags, toggle, redirect, bindings,
                controlEvents, events, isVisible
        }">
            <fade v-if="isVisible">
                <div class="navbar-item search" v-click-outside="hide">
                    <enso-typeahead v-bind="bindings"
                        v-on="events"
                        force-selection
                        ref="typeahead">
                        <template #controls="{ items }">
                            <div class="dropdown-item" v-if="items.length">
                                <div class="tags centered">
                                    <span v-for="(tag, index) in tags(items)"
                                        :key="index"
                                        class="tag is-uppercase is-bold is-clickable"
                                        :class="{ 'is-info': selected(tag) }"
                                        @click.stop="toggle(tag)">
                                        {{ i18n(tag ) }}
                                    </span>
                                </div>
                            </div>
                        </template>
                        <template #option="{ highlight, item }">
                            <span class="tag is-bold is-warning is-uppercase">
                                {{ i18n(item['group']) }}
                            </span>
                            <!-- eslint-disable-next-line vue/no-v-html -->
                            <span v-html="highlight(item['label'])"
                                class="ml-2"/>
                            <span v-if="item.routes.length"
                                class="route-controls">
                                <span v-for="itemRoute in item.routes"
                                    :key="itemRoute.name"
                                    class="icon is-small route-control"
                                    @mousedown="redirect(item, itemRoute.name)">
                                    <fa :icon="itemRoute.icon"
                                        size="sm"/>
                                </span>
                            </span>
                        </template>
                    </enso-typeahead>
                </div>
            </fade>
            <a class="navbar-item"
                v-on="controlEvents"
                v-else>
                <fade>
                    <span class="icon is-small">
                        <fa :icon="faMagnifyingGlass"/>
                    </span>
                </fade>
            </a>
        </template>
    </core-search>
</template>

<script>
import { Fade } from '@enso-ui/transitions';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { EnsoTypeahead } from '@enso-ui/typeahead/bulma';
import { clickOutside } from '@enso-ui/directives';
import CoreSearch from '../../../core/components/navbar/Search.vue';

export default {
    name: 'Search',

    directives: { clickOutside },

    components: {
        CoreSearch, EnsoTypeahead, Fa, Fade,
    },

    inject: ['i18n'],

    data: () => ({
        faMagnifyingGlass,
    }),
};
</script>

<style lang="scss">
    .navbar-item.search {
        position: absolute;

        @media screen and (min-width: 1024px) {
            width: 34em;
            [dir='ltr'] & {
                left: calc(50% - 17em);
            }
            [dir='rtl'] & {
                right:calc(50% - 17em);
            }
        }
        @media screen and (min-width: 768px) and (max-width: 1023px) {
            width: 24em;
            [dir='ltr'] & {
                left: calc(50% - 13em);
            }
            [dir='rtl'] & {
                right:calc(50% - 13em);
            }
        }
        @media screen and (max-width: 767px) {
            width: 22em;
            [dir='ltr'] & {
                left: calc(50% - 11em);
            }
            [dir='rtl'] & {
                right:calc(50% - 11em);
            }
        }

        .tags.centered {
            justify-content: center;
        }

        .field.has-addons {
            margin-bottom: 0;
        }

        .field.has-addons > .control.is-expanded {
            box-shadow: none;
        }

        .field.has-addons > .control.is-expanded .input,
        .field.has-addons > .control.is-expanded .input.is-fullwidth {
            border-radius: 9999px !important;
            box-shadow: none;
            background-color: var(--bulma-input-background-color);
            border-color: var(--bulma-input-border-color);
            color: var(--bulma-input-color);
        }

        .field.has-addons > .control.is-expanded .input:hover,
        .field.has-addons > .control.is-expanded .input:focus,
        .field.has-addons > .control.is-expanded .input:active,
        .field.has-addons > .control.is-expanded .input.is-focused,
        .field.has-addons > .control.is-expanded .input:focus-visible {
            border-color: var(--bulma-input-hover-border-color);
            box-shadow: none;
        }

        .field.has-addons > .control.is-expanded .input::placeholder {
            color: var(--bulma-text-light);
        }

        .dropdown.typeahead,
        .dropdown.typeahead .dropdown-trigger,
        .dropdown.typeahead .dropdown-trigger > .field,
        .dropdown.typeahead .dropdown-trigger > .field > .control.is-expanded {
            border-radius: 9999px;
            box-shadow: none;
        }

        .tag {
            padding: 0.5em;
            height: 1.6em;
            opacity: .7;
            box-shadow: none;
        }
        .route-controls {
            position: absolute;
            margin-top: .15em;
            [dir='ltr'] & {
                right: 1em;
            }
            [dir='rtl'] & {
                left: 1em;
            }
            .route-control {
                z-index: 4;
                opacity: 0.8;
                cursor: pointer;
                [dir='ltr'] & {
                    margin-right: 0.2em;
                }
                [dir='rtl'] & {
                    margin-left: 0.2em;
                }
                &:hover {
                    opacity: 1;
                }
            }
        }
    }

</style>
