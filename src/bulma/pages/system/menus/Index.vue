<template>
    <vue-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('system.menus.initTable')"
        id="menus"/>
</template>

<script>
import VueTable from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: { VueTable },
};
</script>
