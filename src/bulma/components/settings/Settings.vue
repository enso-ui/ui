<template>
    <core-settings>
        <template v-slot:default="{ multiLanguage, multiTheme, meta }">
            <vue-aside class="wrapper settings">
                <p class="menu-label has-text-centered">
                    {{ __("Settings") }}
                </p>
                <ul class="menu-list">
                    <li v-if="multiLanguage"
                        class="settings-item">
                        <language-selector/>
                    </li>
                    <li v-if="multiTheme"
                        class="settings-item">
                        <theme-selector/>
                    </li>
                    <li class="settings-item">
                        <toastr-position/>
                    </li>
                    <li class="settings-item has-margin-bottom-small">
                        <menu-state/>
                    </li>
                    <li class="settings-item has-margin-bottom-small">
                        <bookmarks-state/>
                    </li>
                    <li v-if="canAccess('system.tutorials.show')"
                        class="settings-item">
                        <tutorial/>
                    </li>
                    <li class="settings-item">
                        <key-collector v-if="meta.env === 'local'"/>
                    </li>
                </ul>
            </vue-aside>
        </template>
    </core-settings>
</template>

<script>
import CoreSettings from '../../../core/components/settings/Settings.vue';
import VueAside from '../VueAside.vue';
import LanguageSelector from './LanguageSelector.vue';
import ThemeSelector from './ThemeSelector.vue';
import ToastrPosition from './ToastrPosition.vue';
import MenuState from './MenuState.vue';
import BookmarksState from './BookmarksState.vue';
import Tutorial from './Tutorial.vue';
import KeyCollector from './KeyCollector.vue';

export default {
    components: {
        CoreSettings,
        VueAside,
        LanguageSelector,
        ThemeSelector,
        ToastrPosition,
        MenuState,
        BookmarksState,
        Tutorial,
        KeyCollector,
    },
};

</script>

<style lang="scss">
    .wrapper.settings {
        right: 0;
        overflow-y: auto;

        .settings-item {
            .level-item {
                padding: 6px;
                margin-right: unset;
            }
        }
    }
</style>
