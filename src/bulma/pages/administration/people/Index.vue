<template>
    <vue-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('administration.people.initTable')"
        id="people"/>
</template>

<script>
import VueTable from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: { VueTable },
};
</script>
