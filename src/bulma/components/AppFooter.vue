<template>
    <footer class="footer">
        <div class="content has-text-centered">
            <div class="level mb-2">
                <base-app-footer>
                    <template #default="{ meta }">
                        <div class="level-item">
                            <strong class="mr-1">
                                {{ meta.appName }} v{{ meta.version }}
                            </strong>
                            {{ i18n('built with') }}
                            <span class="icon has-text-danger ml-2">
                                <fa :icon="faHeart"/>
                            </span>
                            <span class="ml-2">
                                +
                            </span>
                            <a href="https://vuejs.org"
                                class="footer-badge ml-1"
                                target="_blank">
                                <span class="icon has-text-success">
                                    <fa :icon="faVuejs"/>
                                </span>
                            </a>
                            <span class="mx-1">
                                +
                            </span>
                            <a href="https://laravel.com"
                                class="footer-badge"
                                target="_blank">
                                <span class="icon has-text-danger">
                                    <fa :icon="faLaravel"/>
                                </span>
                            </a>
                            <span class="mx-1">
                                +
                            </span>
                            <a href="https://bulma.io"
                                class="footer-badge"
                                target="_blank">
                                <img src="/images/bulma.svg"
                                    alt="Bulma"
                                    height="28">
                            </a>
                        </div>
                    </template>
                </base-app-footer>
            </div>
            <div class="level mb-2">
                <div class="level-item">
                    <strong>{{ i18n('Backed by') }}:</strong>
                    <a href="https://earthlink.ro"
                        class="footer-badge footer-badge-earthlink"
                        target="_blank">
                        <img src="/images/earthlink.svg"
                            alt="Earthlink"
                            height="28">
                    </a>
                </div>
            </div>
            <div>
                <a class="has-text-primary"
                    href="https://github.com/laravel-enso/enso"
                    target="_blank">
                    <span class="icon">
                        <fa :icon="faGithub"/>
                    </span>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLaravel, faVuejs } from '@fortawesome/free-brands-svg-icons';
import BaseAppFooter from '../../core/components/AppFooter.vue';

export default {
    name: 'AppFooter',

    components: { BaseAppFooter, Fa },

    inject: ['i18n'],

    data: () => ({
        faGithub,
        faHeart,
        faLaravel,
        faVuejs,
    }),
};
</script>

<style lang="scss">
    .footer {
        background: inherit;
        [dir='ltr'] & {
            margin-left: var(--enso-sidebar-width);
            transition: margin-left .5s, width .5s;
        }
        [dir='rtl'] & {
            margin-right: var(--enso-sidebar-width);
            transition: margin-right .5s, width .5s;
        }

        &.sidebar-collapsed {
            [dir='ltr'] & {
                margin-left: var(--enso-sidebar-collapsed-width);
            }
            [dir='rtl'] & {
                margin-right: var(--enso-sidebar-collapsed-width);
            }
        }

        .footer-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            min-height: 24px;
            padding: 0 0.6rem;
            text-decoration: none;
            color: inherit;

            .icon {
                width: 24px;
                height: 24px;
                font-size: 1.2rem;
            }

            img {
                display: block;
                height: 24px;
                width: auto;
            }
        }

        .footer-badge-earthlink img {
            height: 15px;
        }
    }

    .footer .footer-badge-earthlink img {
        filter:
            drop-shadow(0 0 0.45px rgba(15, 23, 42, 0.82))
            drop-shadow(0 0 1.25px rgba(15, 23, 42, 0.16));
    }

    @media screen and (max-width: 1023px) {
        .footer {
            [dir='ltr'] & {
                margin-left: 0px;
            }
            [dir='rtl'] & {
                margin-right: 0px;
            }
        }
    }

</style>
