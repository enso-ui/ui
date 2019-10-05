import Vue from 'vue';
import Toastr from '@enso-ui/toastr/bulma';
import ToastrPlugin from '@enso-ui/toastr';

Vue.use(ToastrPlugin, {
    layout: Toastr,
    options: {
        duration: 3500,
    },
});
