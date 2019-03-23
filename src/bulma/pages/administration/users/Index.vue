<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="users">
        <template v-slot:avatarId="{ row }">
            <figure class="image is-24x24 avatar">
                <img class="is-rounded"
                    :src="route('core.avatars.show', row.avatarId)"
                    v-if="row.avatarId">
            </figure>
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
