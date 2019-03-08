<template>
    <vue-table class="box is-paddingless raises-on-hover is-rounded"
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
    </vue-table>
</template>

<script>
import VueTable from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: { VueTable },
};
</script>
