<template>
    <enso-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('system.permissions.initTable')"
        id="permissions">
        <span slot="type"
            slot-scope="{ row }"
            :class="[
                'tag is-table-tag',
                row.isRead ? 'is-success' : 'is-warning'
            ]">
                {{ row.type }}
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
