<template>
    <vue-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('system.roles.initTable')"
        id="roles"
        @configure-role="redirect"/>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import VueTable from '@enso-ui/tables/bulma';

library.add([faSave, faSlidersH]);

export default {
    name: 'Index',

    components: { VueTable },

    methods: {
        redirect($event) {
            this.$router.push({
                name: 'system.roles.configure',
                params: { role: $event.dtRowId },
            });
        },
    },
};
</script>
