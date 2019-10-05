import Vue from 'vue';
import { Toastr, ToastrPlugin } from '@enso-ui/toastr/bulma';

Vue.use(ToastrPlugin, {
    layout: Toastr,
    options: {
        duration: 3500,
    },
});
