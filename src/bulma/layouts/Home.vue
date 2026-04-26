<template>
    <section class="home-shell">
        <div class="home-grid"/>
        <div class="home-orb home-orb--a"/>
        <div class="home-orb home-orb--b"/>
        <div class="home-corner home-corner--tl"/>
        <div class="home-corner home-corner--tr"/>
        <div class="home-corner home-corner--bl"/>
        <div class="home-corner home-corner--br"/>
        <core-home v-slot="{ loading, showQuote, quote, hide }">
            <div class="home-body">
                <loader transparent
                    size="large"
                    color="rgba(27,58,107,0.35)"
                    v-if="loading"/>
                <div v-else-if="showQuote"
                    class="home-stage">
                    <div class="home-kicker">
                        <span class="home-kicker__line"/>
                        <span class="home-kicker__dot"/>
                        <span class="home-kicker__text">Daily Perspective</span>
                        <span class="home-kicker__dot"/>
                        <span class="home-kicker__line home-kicker__line--r"/>
                    </div>

                    <fade enter="down" leave="up">
                        <p class="home-quote">{{ quote }}</p>
                    </fade>

                    <div class="home-sep">
                        <span/>
                        <span/>
                        <span class="home-sep__pulse"/>
                        <span/>
                        <span/>
                    </div>

                    <fade enter="up" leave="down">
                        <button class="home-btn"
                            v-focus
                            @click="hide">
                            <span/>
                            {{ i18n('Enter the application') }}
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
@import '../styles/home';
</style>
