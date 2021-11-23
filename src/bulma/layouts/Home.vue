<template>
    <core-home #default="{ loading, showQuote, quote, hide }">
        <section class="hero is-fullheight is-primary is-bold">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <loader transparent
                        size="large"
                        color="#dbdbdb"
                        v-if="loading"/>
                    <div v-else-if="showQuote">
                        <fade enter="down"
                            leave="up">
                            <div class="subtitle is-1 inspiring">
                                {{ quote }}
                            </div>
                        </fade>
                        <fade enter="right"
                            leave="left">
                            <button class="button is-outlined"
                                v-focus
                                @click="hide">
                                {{ i18n('Enter the application') }}
                            </button>
                        </fade>
                    </div>
                </div>
            </div>
        </section>
    </core-home>
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

<style>
    .title.inspiring {
        font-weight: 100;
    }
</style>
