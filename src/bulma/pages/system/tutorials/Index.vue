<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="tutorials">
        <template v-slot:placement="{ row }">
            <span class="tag is-table-tag is-info">
                {{ row.placement }}
            </span>
        </template>
    </enso-table>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: { EnsoTable },
};
</script>
