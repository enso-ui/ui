<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box form-box has-background-light raises-on-hover animated fadeIn"
                @loaded="ready = true"
                ref="form">
                <template v-slot:actions>
                    <a class="button is-warning"
                        @click="$router.push({
                            name: 'administration.users.edit',
                            params: { user: $refs.form.param('userId') }
                        })"
                        v-if="ready && $refs.form.param('userId')">
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
                            params: { person: $refs.form.routeParam('person') }
                        })"
                        v-else-if="ready">
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
            <accessories v-if="ready">
                <template slot-scope="{ count }">
                    <tab keep-alive
                        id="Addresses">
                        <addresses controls
                            type="LaravelEnso\People\app\Models\Person"
                            :id="$refs.form.routeParam('person')"
                            @update="$set(count, 'Addresses', $refs.addresses.count)"
                            ref="addresses"/>
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
import { EnsoForm } from '@enso-ui/forms/bulma';
import { Accessories, Addresses } from '@enso-ui/accessories/bulma';

library.add(faUser);

export default {
    name: 'Edit',

    components: {
        EnsoForm, Accessories, Tab, Addresses,
    },

    inject: ['i18n'],

    data: () => ({
        ready: false,
    }),
};

</script>
