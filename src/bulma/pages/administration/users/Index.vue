<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="users">
        <template v-slot:avatarId="{ row }">
            <figure class="image is-24x24 avatar">
                <img class="is-rounded"
                    :src="avatarLink(row.avatarId)"
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

    methods: {
        avatarLink(id) {
            return route('core.avatars.show', id);
        },
    },
};
</script>

<style lang="scss" scoped>
    .avatar {
        margin:auto;
    }
</style>
