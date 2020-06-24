<template>
    <div class="login">
        <div class="box has-padding-medium">
            <h3 class="title is-3 has-text-black has-text-centered has-margin-bottom-medium">
                <figure class="image is-24x24 logo is-clickable"
                    @click="$router.push({ name: 'login' })">
                    <img src="/images/logo.svg">
                </figure>
                {{ meta.appName }}
            </h3>
            <form class="has-margin-bottom-medium"
                @submit.prevent="submit()">
                <div class="field">
                    <div class="control has-icons-left has-icons-right">
                        <input v-model="email"
                            v-focus
                            class="input"
                            type="email"
                            :class="{ 'is-danger': errors.has('email'), 'is-success': isSuccessful }"
                            :placeholder="i18n('Email')"
                            @input="errors.clear('email')">
                        <span class="icon is-small is-left">
                            <fa icon="envelope"/>
                        </span>
                        <span v-if="isSuccessful"
                            class="icon is-small is-right has-text-success">
                            <fa icon="check"/>
                        </span>
                        <span v-if="errors.has('email')"
                            class="icon is-small is-right has-text-danger">
                            <fa icon="exclamation-triangle"/>
                        </span>
                    </div>
                    <p class="has-text-left has-text-danger is-size-7"
                        v-if="errors.has('email')">
                        {{ errors.get('email') }}
                    </p>
                </div>
                <div v-if="isLogin || isReset" class="field">
                    <div class="control has-icons-left has-icons-right">
                        <input v-model="password"
                            class="input"
                            type="password"
                            :class="{ 'is-danger': errors.has('password'), 'is-success': isSuccessful }"
                            :placeholder="i18n('Password')"
                            @input="errors.clear('password')">
                        <span class="icon is-small is-left">
                            <fa icon="lock"/>
                        </span>
                        <span v-if="isSuccessful"
                            class="icon is-small is-right has-text-success">
                            <fa icon="check"/>
                        </span>
                        <span v-if="errors.has('password')"
                            class="icon is-small is-right has-text-danger">
                            <fa icon="exclamation-triangle"/>
                        </span>
                        <slot name="password-strength"
                            :password="password"
                            :has-password="hasPassword"/>
                    </div>
                    <p class="has-text-left has-text-danger is-size-7"
                        v-if="errors.has('password')">
                        {{ errors.get('password') }}
                    </p>
                </div>
                <div v-if="isReset" class="field">
                    <div class="control has-icons-left has-icons-right">
                        <input v-model="passwordConfirmation"
                            class="input"
                            type="password"
                            :class="{ 'is-danger': errors.has('password'), 'is-success': isSuccessful }"
                            :placeholder="i18n('Repeat Password')"
                            @input="errors.clear('password')">
                        <span class="icon is-small is-left">
                            <fa icon="lock"/>
                        </span>
                        <span v-if="isSuccessful"
                            class="icon is-small is-right has-text-success">
                            <fa icon="check"/>
                        </span>
                        <span v-if="errors.has('password')"
                            class="icon is-small is-right has-text-danger">
                            <fa icon="exclamation-triangle"/>
                        </span>
                        <span v-if="match && !errors.has('password')"
                            class="icon is-small is-right has-text-success">
                            <fa icon="check"/>
                        </span>
                    </div>
                    <p class="has-text-left has-text-danger is-size-7"
                        v-if="errors.has('password')">
                        {{ errors.get('password') }}
                    </p>
                </div>
                <div v-if="isLogin" class="field">
                    <div class="control">
                        <label class="checkbox">
                        <input v-model="remember"
                            type="checkbox">
                            {{ i18n('Remember me') }}
                        </label>
                    </div>
                </div>
                <div class="field">
                    <button class="button is-primary is-fullwidth"
                        :class="{ 'is-loading': loading }"
                        type="submit"
                        @click.prevent="submit()">
                        <span class="icon is-small">
                            <fa :icon="isReset ? 'lock' : 'user'"/>
                        </span>
                        <span>{{ i18n(action) }}</span>
                    </button>
                </div>
            </form>
            <router-link v-if="isLogin"
                :to="{ name: 'password.email' }"
                class="is-pulled-right">
                {{ i18n('Forgot password') }}
            </router-link>
            <div class="is-clearfix"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faEnvelope, faCheck, faExclamationTriangle, faLock, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { focus } from '@enso-ui/directives';
import Errors from '@enso-ui/laravel-validation';

library.add([
    faEnvelope, faCheck, faExclamationTriangle, faLock, faUser,
]);

export default {
    name: 'AuthForm',

    directives: { focus },

    inject: {
        i18n: { from: 'i18n' },
        routeResolver: { from: 'route' },
    },

    props: {
        action: {
            required: true,
            type: String
        },
        isLogin: {
            default: false,
            type: Boolean
        },
        isReset: {
            default: false,
            type: Boolean
        },
        route: {
            required: true,
            type: String
        }
    },

    data: () => ({
        email: '',
        errors: new Errors(),
        isSuccessful: false,
        loading: false,
        password: '',
        passwordConfirmation: null,
        remember: false,
    }),

    computed: {
        ...mapState(['meta']),
        token() {
            return this.isReset
                ? this.$route.params.token
                : null;
        },
        hasPassword() {
            return this.password !== null && this.password.length;
        },
        match() {
            return this.hasPassword
                && this.password === this.passwordConfirmation;
        },
        postParams() {
            if (this.isLogin) {
                return this.loginParams;
            }

            return this.isReset
                ? this.resetParams
                : { email: this.email };
        },
        loginParams() {
            const { email, password, remember } = this;

            return { email, password, remember };
        },
        resetParams() {
            const { email, password, token } = this;

            return { email, password, password_confirmation: this.passwordConfirmation, token };
        },
    },

    methods: {
        submit() {
            this.loading = true;
            this.isSuccessful = false;

            axios.post(this.routeResolver(this.route), this.postParams)
                .then(({ data }) => {
                    this.loading = false;
                    this.isSuccessful = true;
                    this.$emit('success', data);
                }).catch((error) => {
                    this.loading = false;

                    const { status, data } = error.response;

                    if (status === 429 || (status === 422 && ! data.errors)) {
                        this.$toastr.error(data.message);
                        return;
                    }

                    if (status === 422) {
                        this.errors.set(data.errors);
                        return;
                    }

                    throw error;
                });
        },
    },
};
</script>

<style lang="scss">
    .login {
         max-width: 400px;
         margin: auto;
    }

    figure.logo {
        display: inline-block;
    }
</style>
