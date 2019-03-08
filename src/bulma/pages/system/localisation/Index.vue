<template>
    <enso-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('system.localisation.initTable')"
        id="localisation">
        <i slot="flag"
            slot-scope="{ row }"
            :class="row['flag']"/>
    </enso-table>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EnsoTable } from '@enso-ui/tables/bulma';

library.add(faEdit);

export default {
    name: 'Index',

    components: { EnsoTable },
};
</script>
