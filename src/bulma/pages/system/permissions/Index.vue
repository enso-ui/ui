<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="permissions">
        <template v-slot:type="{ row }">
            <span class="tag is-table-tag"
                :class="row.isRead ? 'is-success' : 'is-warning'">
                {{ row.type }}
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
