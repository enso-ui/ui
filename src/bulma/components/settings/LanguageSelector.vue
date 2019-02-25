<template>
    <core-language-selector>
        <template v-slot:default="{ languages, locale, update }">
            <div class="level is-mobile settings">
                <div class="level-left">
                    <div class="level-item">
                        {{ __('Language') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <dropdown>
                            <span slot="label"
                                class="icon is-small is-pulled-right">
                                <i :class="languages[locale]"/>
                            </span>
                            <a v-for="(flag, lang) in languages"
                                :key="lang"
                                class="dropdown-item has-text-centered"
                                :class="{ 'is-active': flag === languages[locale] }"
                                @click="update(lang)">
                                <span class="icon is-small">
                                    <i :class="flag"/>
                                </span>
                            </a>
                        </dropdown>
                    </div>
                </div>
            </div>
        </template>
    </core-language-selector>
</template>

<script>
import { Dropdown } from '@enso-ui/bulma';
import CoreLanguageSelector from '../../../core/components/settings/LanguageSelector.vue';

export default {
    components: { CoreLanguageSelector, Dropdown },
};
</script>

<style lang="scss">
    @import './flags/flags';
</style>
