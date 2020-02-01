<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="users">
        <template v-slot:avatarId="{ row }">
            <avatar class="is-24x24"
                :user="row"/>
        </template>
    </enso-table>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';
import Avatar from './components/Avatar.vue';

export default {
    name: 'Index',

    components: { EnsoTable, Avatar },

    inject: ['route'],
};
</script>

<style lang="scss">
    .avatar {
        margin: auto;
    }
</style>
