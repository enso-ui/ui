<template>
    <vue-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('administration.companies.initTable')"
        id="companies"/>
</template>

<script>
import VueTable from '@enso-ui/tables/bulma';

export default {
    mame: 'Index',

    components: { VueTable },
};
</script>
