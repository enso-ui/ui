<template>
    <core-theme-selector>
        <template v-slot:default="{ itemEvents }">
            <div class="level is-mobile settings">
                <div class="level-left">
                    <div class="level-item">
                        {{ __('Theme') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <a class="button is-naked"
                            v-on="itemEvents">
                            <span class="icon is-small">
                                <fa icon="lightbulb"/>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </template>
    </core-theme-selector>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import CoreThemeSelector from '../../../core/components/settings/ThemeSelector.vue';

library.add(faLightbulb);

export default {
    components: { CoreThemeSelector },
};
</script>
