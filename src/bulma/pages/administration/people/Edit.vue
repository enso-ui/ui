<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box form-box has-background-light raises-on-hover"
                @ready="companies = $refs.form.field('companies').value"
                ref="form">
                <template v-slot:companies="props">
                    <form-field v-bind="props"
                        @input="companies = $event"/>
                </template>
                <template v-slot:company="props">
                    <form-field v-bind="props"
                        :params="params"/>
                </template>
                <template v-slot:actions>
                    <a class="button is-warning"
                        @click="$router.push({
                            name: 'administration.users.edit',
                            params: { user: $refs.form.param('userId') }
                        })"
                        v-if="$refs.form.param('userId')">
                        <span class="is-hidden-mobile">
                            {{ i18n('Edit User') }}
                        </span>
                        <span class="icon">
                            <fa icon="user"/>
                        </span>
                        <span class="is-hidden-mobile"/>
                    </a>
                    <a class="button is-primary"
                        @click="$router.push({
                            name: 'administration.users.create',
                            params: $route.params,
                        })"
                        v-else>
                        <span class="is-hidden-mobile">
                            {{ i18n('Create User') }}
                        </span>
                        <span class="icon">
                            <fa icon="user"/>
                        </span>
                        <span class="is-hidden-mobile"/>
                    </a>
                </template>
            </enso-form>
            <accessories>
                <template slot-scope="{ count }">
                    <tab keep-alive
                        id="Addresses">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <addresses controls
                                    type="LaravelEnso\People\app\Models\Person"
                                    :id="personId"
                                    @update="$set(count, 'Addresses', $refs.addresses.count)"
                                    ref="addresses"/>
                            </div>
                        </div>
                    </tab>
                </template>
            </accessories>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Tab } from '@enso-ui/bulma';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import { Accessories, Addresses } from '@enso-ui/accessories/bulma';

library.add(faUser);

export default {
    name: 'Edit',

    components: {
        EnsoForm, Accessories, Tab, Addresses, FormField,
    },

    inject: ['i18n'],

    data: () => ({
        companies: [],
    }),

    computed: {
        personId() {
            return Number.parseInt(this.$route.params.person, 10);
        },
        params() {
            return {
                id: this.companies,
            };
        },
    },
};
</script>
