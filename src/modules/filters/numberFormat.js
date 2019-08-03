import Vue from 'vue';
import store from '@root/store';

Vue.filter('numberFormat', (value, decimals = 3) => new Intl.NumberFormat(
    store.state.preferences.global.lang, {
        style: 'decimal',
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
    },
).format(value));
