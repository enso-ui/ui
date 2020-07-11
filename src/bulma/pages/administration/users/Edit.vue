<template>
    <div class="columns is-centered">
        <div class="column is-four-fifths-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"
                ref="form"
                @ready="
                    ready = true;
                    pivotParams.userGroups.id = $refs.form.field('group_id').value;
                ">
                <template v-slot:group_id="props">
                    <form-field v-bind="props"
                        @input="pivotParams.userGroups.id = $event"/>
                </template>
                <template v-slot:role_id="props">
                    <form-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
                <template v-slot:password="props">
                    <form-field v-bind="props"
                        @focus="props.field.meta.readonly = false"
                        @blur="props.field.meta.readonly = true"
                        @input="password = $event.target.value"
                        v-if="!props.field.meta.hidden"/>
                    <password-strength class="has-margin-top-small"
                        :password="props.field.value"/>
                </template>
                <template v-slot:password_confirmation="props">
                    <form-field v-bind="props"
                        @focus="props.field.meta.readonly = false"
                        @blur="props.field.meta.readonly = true"
                        @input="passwordConfirmation = $event.target.value"
                        @keydown="$emit('update');"
                        v-if="!props.field.meta.hidden"/>
                </template>
                <template v-slot:actions-left>
                    <div class="level-item"
                        v-if="canAccess('administration.users.destroy')">
                        <a class="button is-danger"
                            @click="deletableUser = Number.parseInt($route.params.user, 10)"
                            v-if="ready">
                            <span class="is-hidden-mobile">
                                {{ i18n('Delete') }}
                            </span>
                            <span class="icon">
                                <fa icon="trash-alt"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                    <div class="level-item">
                        <a class="button is-warning"
                            @click="$router.push({
                                name: 'administration.people.edit',
                                params: { person: $refs.form.param('personId') }
                            })"
                            v-if="ready">
                            <span class="is-hidden-mobile">
                                {{ i18n('Edit Person') }}
                            </span>
                            <span class="icon">
                                <fa icon="user-tie"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                    <div class="level-item"
                        v-if="canAccess('administration.users.token')">
                        <a class="button is-link"
                           @click="generateToken"
                           v-if="ready">
                            <span class="is-hidden-mobile">
                                {{ i18n('Generate Token') }}
                            </span>
                            <span class="icon">
                                <fa icon="key"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                    <div class="level-item"
                        v-if="canAccess('administration.users.resetPassword')">
                        <a class="button is-black"
                           @click="resetPassword"
                           v-if="ready">
                            <span class="is-hidden-mobile">
                                {{ i18n('Reset Password') }}
                            </span>
                            <span class="icon">
                                <fa icon="redo"/>
                            </span>
                            <span class="is-hidden-mobile"/>
                        </a>
                    </div>
                </template>
            </enso-form>
            <delete-modal :user-id="deletableUser"
                @close="deletableUser = null"
                @destroyed="navigateToIndex"
                v-if="!!deletableUser"/>
            <url :show="token !== ''"
                :link="token"
                @close="token = ''"/>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserTie, faTrashAlt, faKey, faRedo } from '@fortawesome/free-solid-svg-icons';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import Url from '@enso-ui/files/src/bulma/pages/files/components/Url.vue'; // TODO:: refactor to a package
import PasswordStrength from '../../auth/components/PasswordStrength.vue';
import DeleteModal from './components/DeleteModal.vue';

library.add(faUserTie, faTrashAlt, faKey, faRedo);

export default {
    name: 'Edit',

    components: {
        EnsoForm, FormField, PasswordStrength, DeleteModal, Url,
    },

    inject: ['i18n', 'canAccess', 'route', 'toastr', 'errorHandler'],

    data: () => ({
        deletableUser: null,
        ready: false,
        pivotParams: { userGroups: { id: null } },
        password: null,
        passwordConfirmation: null,
        token: '',
    }),

    methods: {
        navigateToIndex() {
            this.deletableUser = null;

            this.$nextTick(() => {
                this.$router.push({
                    name: 'administration.users.index',
                });
            });
        },
        generateToken() {
            axios.post(this.route('administration.users.token', this.$route.params))
                .then(({ data }) => this.token = data.token)
                .catch(this.errorHandler);
        },
        resetPassword() {
            axios.post(this.route('administration.users.resetPassword', this.$route.params))
                .then(({ data }) => this.toastr.success(data.message))
                .catch(this.errorHandler);
        },
    },
};
</script>
