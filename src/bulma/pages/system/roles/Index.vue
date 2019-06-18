<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="roles"
        @configure-role="redirect"
        @write-config-file="$toastr.success($event.message)"/>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSave, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { EnsoTable } from '@enso-ui/tables/bulma';

library.add([faSave, faSlidersH]);

export default {
    name: 'Index',

    components: { EnsoTable },

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
