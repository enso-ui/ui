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
                    <div class="level-item">
                        <dropdown class="is-right">
                            <template v-slot:label>
                                <figure class="image is-16x16">
                                    <img :src="`/images/corners/${toastrPosition}.svg`">
                                </figure>
                            </template>
                            <template v-slot:options>
                                <a v-for="(position, key) in positions"
                                    :key="key"
                                    class="dropdown-item"
                                    :class="{ 'is-active': position === toastrPosition }"
                                    @click="update(position)">
                                    <figure class="image is-16x16 toastr-position">
                                        <img :src="`/images/corners/${position}.svg`">
                                    </figure>
                                </a>
                            </template>
                        </dropdown>
                    </div>
                </div>
            </div>
        </template>
    </core-toastr-position>
</template>

<script>
import { Dropdown } from '@enso-ui/bulma';
import CoreToastrPosition from '../../../core/components/settings/ToastrPosition.vue';

export default {
    name: 'ToastrPosition',

    components: { CoreToastrPosition, Dropdown },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    .toastr-position {
        margin: auto;
    }
</style>
