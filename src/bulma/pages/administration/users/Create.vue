<template>
<div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover animated fadeIn">
                <template v-slot:group_id="props">
                    <select-field v-bind="props"
                        @input="pivotParams.userGroups.id = $event"/>
                </template>
                <template v-slot:role_id="props">
                    <select-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
            </enso-form>
        </div>
    </div>
</template>

<script>
import { EnsoForm, SelectField } from '@enso-ui/forms/bulma';

export default {
    name: 'Create',

    components: { EnsoForm, SelectField },

    data: () => ({
        pivotParams: { userGroups: { id: null } },
    }),
};
</script>
