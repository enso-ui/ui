<template>
    <vue-table id="userGroups"
        class="box is-paddingless raises-on-hover is-rounded"
        :path="route('administration.userGroups.initTable')"/>
</template>

<script>
import VueTable from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: { VueTable },
};
</script>
