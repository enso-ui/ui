// eslint-disable-next-line import/no-unresolved
import store from '@root/store';
import format from '@enso-ui/date/src/format.js';

export default (date, formatStr = null) => format(
    date,
    formatStr || store.state.meta.dateFormat,
    store.state.preferences.global.lang,
);
