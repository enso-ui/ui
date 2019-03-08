<template>
    <enso-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('system.tutorials.initTable')"
        id="tutorials">
        <span slot="placement"
            slot-scope="{ row }"
            class="tag is-table-tag is-info">
            {{ row['placement'] }}
        </span>
    </enso-table>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: { EnsoTable },
};
</script>
