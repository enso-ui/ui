<template>
    <core-bookmark-state>
        <template v-slot:default="{ bindings, events }">
            <div class="level is-mobile settings">
                <div class="level-left">
                    <div class="level-item">
                        {{ __('Bookmarks') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <vue-switch class="is-medium"
                            v-bind="bindings"
                            v-on="events"/>
                    </div>
                </div>
            </div>
        </template>
    </core-bookmark-state>
</template>

<script>
import { VueSwitch } from '@enso-ui/bulma';
import CoreBookmarkState from '../../../core/components/settings/BookmarksState.vue';

export default {
    name: 'BookmarksState',

    components: { CoreBookmarkState, VueSwitch },
};
</script>
