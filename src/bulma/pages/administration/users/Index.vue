<template>
    <enso-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('administration.users.initTable')"
        id="users">
        <figure class="image is-24x24 avatar"
            slot="avatarId"
            slot-scope="{ row }">
            <img class="is-rounded"
                :src="avatarLink(row.avatarId)"
                v-if="row.avatarId">
        </figure>
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
