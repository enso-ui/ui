<template>
    <enso-table class="box is-paddingless raises-on-hover is-rounded"
        :path="route('system.menus.initTable')"
        id="menus"/>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',

    components: { EnsoTable },
};
</script>
