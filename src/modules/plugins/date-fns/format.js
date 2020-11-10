import format from '@enso-ui/date/src/format.js';
import store from '../../../core/services/store';

export default (date, formatStr = null) => format(
    date,
    formatStr || store.state.meta.dateFormat,
    store.state.preferences.global.lang,
);
