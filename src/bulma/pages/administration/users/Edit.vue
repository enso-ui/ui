<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover animated fadeIn"
                ref="form"
                @loaded="
                    ready = true;
                    pivotParams.userGroups.id = $refs.form.field('group_id').value;
                ">
                <template v-slot:group_id="props">
                    <select-field v-bind="props"
                        @input="pivotParams.userGroups.id = $event"/>
                </template>
                <template v-slot:role_id="props">
                    <select-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
                <template v-slot:password="props">
                    <input-field v-bind="props"
                        @focus="props.field.meta.readonly = false"
                        @blur="props.field.meta.readonly = true"
                        @input="password = $event.target.value"
                        v-if="!props.field.meta.hidden"/>
                    <password-strength class="has-margin-top-small"
                        :password="props.field.value"/>
                </template>
                <template v-slot:password_confirmation="props">
                    <input-field v-bind="props"
                        @focus="props.field.meta.readonly = false"
                        @blur="props.field.meta.readonly = true"
                        @input="passwordConfirmation = $event.target.value"
                        @keydown="$emit('update');"
                        v-if="!props.field.meta.hidden"/>
                </template>
                <template v-slot:actions>
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
                </template>
            </enso-form>
        </div>
    </div>
</template>

<script>
import { EnsoForm, SelectField, InputField } from '@enso-ui/forms/bulma';
import PasswordStrength from '../../auth/components/PasswordStrength.vue';

export default {
    name: 'Edit',

    components: {
        EnsoForm, InputField, SelectField, PasswordStrength,
    },

    inject: ['i18n'],

    data: () => ({
        ready: false,
        pivotParams: { userGroups: { id: null } },
        password: null,
        passwordConfirmation: null,
    }),
};
</script>
