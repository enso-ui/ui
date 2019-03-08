<template>
    <vue-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('system.localisation.initTable')"
        id="localisation">
        <i slot="flag"
            slot-scope="{ row }"
            :class="row['flag']"/>
    </vue-table>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import VueTable from '@enso-ui/tables/bulma';

library.add(faEdit);

export default {
    name: 'Index',

    components: { VueTable },
};
</script>
