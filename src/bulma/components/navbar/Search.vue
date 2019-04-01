<template>
    <core-search>
        <template v-slot:default="{
                selected, tags, toggle, redirect, bindings, events, isRTL
            }">
            <s-search :isRTL='isRTL'>
            <div class="navbar-item search">
                <typeahead is-rounded
                    v-bind="bindings"
                    v-on="events"
                    @selected="clear"
                    ref="typeahead">
                    <template v-slot:controls="{ items }">
                        <template v-if="items.length">
                            <div v-if="tags(items).length < 6"
                                class="dropdown-item has-text-centered">
                                <a v-for="(tag, index) in tags(items)"
                                    :key="index"
                                    class="tag control-list is-uppercase is-bold"
                                    :class="{ 'is-warning': selected(tag) }"
                                    @click.stop="toggle(tag)">
                                    {{ i18n(tag ) }}
                                </a>
                            </div>
                            <div v-else
                                class="has-text-centered">
                                <p class="title is-6">
                                    {{ i18n('Categories found') }}: {{ tags(items).length }}
                                </p>
                            </div>
                        </template>
                    </template>
                    <template v-slot:option="{ highlight, item }">
                        <span>
                            <span class="tag is-bold is-warning is-uppercase">
                                {{ i18n(item['group']) }}
                            </span>
                            <span v-html="highlight(item['label'])"/>
                            <span v-if="item.routes.length"
                                class="route-controls">
                                <span v-for="itemRoute in item.routes"
                                    :key="itemRoute.name"
                                    class="icon is-small route-control"
                                    @mousedown.stop="redirect(item, itemRoute.name); clear()">
                                    <fa :icon="itemRoute.icon" size="sm"/>
                                </span>
                            </span>
                        </span>
                    </template>
                </typeahead>
            </div>
            </s-search>
        </template>
    </core-search>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faPencilAlt, faListUl } from '@fortawesome/free-solid-svg-icons';
import { Typeahead } from '@enso-ui/bulma';
import CoreSearch from '../../../core/components/navbar/Search.vue';
import SSearch from './styled/SSearch';

library.add(faEye, faPencilAlt, faListUl);

export default {
    name: 'Search',

    components: { CoreSearch, Typeahead, SSearch },

    inject: ['i18n'],

    methods: {
        clear() {
            this.$nextTick(this.$refs.typeahead.clear());
        },
    },
};
</script>
