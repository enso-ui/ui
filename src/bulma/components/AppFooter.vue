<template>
    <base-app-footer>
        <template v-slot:default="{ meta} ">
            <footer class="footer">
                <div class="content has-text-centered">
                    <div class="level">
                        <div class="level-item">
                            <strong class="has-margin-right-small">
                                {{ meta.appName }} v{{ meta.version }}
                            </strong>
                            built with
                            <span class="icon has-text-danger">
                                <fa icon="heart"/>
                            </span>
                            <span class="has-margin-left-small">
                                +
                            </span>
                            <a href="https://vuejs.org"
                                target="_blank">
                                <img src="/images/vue-badge.png"
                                    alt="Made with Vue"
                                    width="28"
                                    height="28">
                            </a>
                            +
                            <a href="https://laravel.com"
                                class="has-margin-left-small"
                                target="_blank">
                                <img src="/images/laravel-badge.png"
                                    alt="Made with Laravel"
                                    width="28"
                                    height="28">
                            </a>
                            <span class="has-margin-left-small">
                                +
                            </span>
                            <a href="https://bulma.io"
                                target="_blank">
                                <img src="/images/bulma.svg"
                                    alt="Made with Bulma"
                                    width="28"
                                    height="28">
                            </a>
                        </div>
                    </div>
                    <div class="level">
                        <div class="level-item">
                            <strong>Backed by:</strong>
                            <a href="https://earthlink.ro"
                                target="_blank">
                                <figure class="image earthlink">
                                    <img src="/images/earthlink.svg">
                                </figure>
                            </a>
                        </div>
                    </div>
                    <div>
                        <a href="https://github.com/laravel-enso/enso"
                            target="_blank">
                            <span class="icon">
                                <fa :icon="['fab', 'github']"/>
                            </span>
                        </a>
                    </div>
                </div>
            </footer>
        </template>
    </base-app-footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import BaseAppFooter from '../../core/components/AppFooter.vue';

library.add(faHeart, faGithub);

export default {
    name: 'AppFooter',

    components: { BaseAppFooter },
};
</script>

<style lang="scss">
    .footer {
        margin-left: 180px;
        background: inherit;
        [dir='rtl'] & {
            margin-right: 180px;
            margin-left: unset;
        }

        figure.image.earthlink {
            width: 112px;
            margin-left: 1em;
            margin-right: 1em;
        }
    }

    @media screen and (max-width: 1023px) {
        .footer {
            margin-left: 0px;
            [dir='rtl'] & {
                margin-right: 0px;
                margin-left: unset;
            }
        }
    }

</style>
