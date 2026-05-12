<template>
    <div class="logins-wrapper">
        <div class="columns is-centered is-multiline">
            <div class="column is-narrow">
                <EnsoSelectFilter class="box user"
                    compact
                    source="administration.users.options"
                    label="person.name"
                    :name="i18n('User')"
                    :placeholder="i18n('User')"
                    v-model="filters.logins.user_id"/>
            </div>
            <div class="column is-narrow">
                <EnsoDateFilter class="box"
                    compact
                    v-model:filter="dateFilter"
                    v-model:interval="intervals.logins.created_at"/>
            </div>
        </div>
        <EnsoTable class="box p-0"
            v-model:filters="filters"
            :intervals="intervals"
            :filter-version="1"
            id="logins">
            <template #user="{ row }">
                <span class="is-inline-flex is-clickable"
                    @click="filters.logins.user_id = row.user.id"
                    v-if="row.user">
                    <Avatar class="is-24x24"
                        tooltip
                        :user="row.user"/>
                </span>
            </template>
        </EnsoTable>
    </div>
</template>

<script setup>
import { inject, reactive, ref } from 'vue';
import { EnsoDateFilter, EnsoSelectFilter } from '@enso-ui/filters/bulma';
import { EnsoTable } from '@enso-ui/tables/bulma';
import Avatar from '@enso-ui/users/src/bulma/pages/users/components/Avatar.vue';

const i18n = inject('i18n');

const dateFilter = ref('all');

const filters = ref({
    logins: {
        user_id: null,
    },
});

const intervals = reactive({
    logins: {
        created_at: {
            max: null,
            min: null,
        },
    },
});
</script>

<style lang="scss">
.logins-wrapper {
    .select-filter.user {
        width: 18em;
    }
}
</style>
