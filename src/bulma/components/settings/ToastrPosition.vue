<template>
    <core-toastr-position>
        <template v-slot:default="{ positions, toastrPosition, update }">
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="level-item is-marginless">
                        {{ i18n('Notifications') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item toastr-position">
                        <dropdown>
                            <template v-slot:label>
                                <figure class="image is-16x16 has-margin-left-small">
                                    <img :src="`/images/corners/${toastrPosition}.svg`">
                                </figure>
                            </template>
                            <template v-slot:items="{ itemBindings, itemEvents }">
                                <dropdown-item v-for="(position, index) in positions"
                                    :key="position"
                                    @select="update(position)"
                                    v-bind="itemBindings(toastrPosition === position, index)"
                                    v-on="itemEvents(index)">
                                    <figure class="image is-16x16">
                                        <img :src="`/images/corners/${position}.svg`">
                                    </figure>
                                </dropdown-item>
                            </template>
                        </dropdown>
                    </div>
                </div>
            </div>
        </template>
    </core-toastr-position>
</template>

<script>
import { Dropdown, DropdownItem } from '@enso-ui/dropdown/bulma';
import CoreToastrPosition from '../../../core/components/settings/ToastrPosition.vue';

export default {
    name: 'ToastrPosition',

    components: { CoreToastrPosition, Dropdown, DropdownItem },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    .toastr-position .dropdown .dropdown-content {
        width: 4.6em;
        .items {
            figure {
                margin: auto;
            }
        }
    }
</style>
