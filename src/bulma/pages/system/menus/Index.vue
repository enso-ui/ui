<template>
    <vue-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('system.menus.initTable')"
        id="menus"/>
</template>

<script>
import VueTable from '@components/enso/vuedatatable/VueTable.vue';

export default {
    name: 'Index',

    components: { VueTable },
};
</script>
