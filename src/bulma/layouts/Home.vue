<template>
    <section class="qs-shell home-layout">
        <div class="qs-grid"/>
        <div class="qs-orb qs-orb--a"/>
        <div class="qs-orb qs-orb--b"/>
        <div class="qs-corner qs-corner--tl"/>
        <div class="qs-corner qs-corner--tr"/>
        <div class="qs-corner qs-corner--bl"/>
        <div class="qs-corner qs-corner--br"/>
        <core-home v-slot="{ loading, showQuote, quote, hide }">
            <div class="qs-body">
                <loader transparent
                    size="large"
                    color="rgba(255,255,255,0.45)"
                    v-if="loading"/>
                <div v-else-if="showQuote"
                    class="qs-stage">
                    <div class="qs-kicker">
                        <span class="qs-kicker__line"/>
                        <span class="qs-kicker__dot"/>
                        <span class="qs-kicker__text">Daily Perspective</span>
                        <span class="qs-kicker__dot"/>
                        <span class="qs-kicker__line qs-kicker__line--r"/>
                    </div>

                    <fade enter="down"
                        leave="up">
                        <p class="qs-quote">
                            {{ quote }}
                        </p>
                    </fade>

                    <div class="qs-sep">
                        <span class="qs-sep__d"/>
                        <span class="qs-sep__l"/>
                        <span class="qs-sep__d qs-sep__d--pulse"/>
                        <span class="qs-sep__l"/>
                        <span class="qs-sep__d"/>
                    </div>

                    <fade enter="up"
                        leave="down">
                        <button class="qs-btn"
                            v-focus
                            @click="hide">
                            <span class="qs-btn__scan"/>
                            <span class="qs-btn__label">{{ i18n('Enter the application') }}</span>
                            <svg class="qs-btn__arrow" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </fade>
                </div>
            </div>
        </core-home>
    </section>
</template>

<script>
import { Fade } from '@enso-ui/transitions';
import { focus } from '@enso-ui/directives';
import Loader from '@enso-ui/loader/bulma';
import CoreHome from '../../core/layouts/Home.vue';

export default {
    name: 'Home',

    components: { CoreHome, Fade, Loader },

    directives: { focus },

    inject: ['i18n'],
};
</script>

<style lang="scss">
@import '@app/sass/home';
</style>
