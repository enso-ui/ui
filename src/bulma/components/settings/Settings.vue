<template>
    <core-settings>
        <template v-slot:default="{ multiLanguage, multiTheme, meta }">
            <vue-aside class="settings-wrapper">
                <p class="menu-label has-text-centered">
                    {{ i18n("Settings") }}
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
    name: 'Settings',

    inject: ['canAccess', 'i18n'],

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
