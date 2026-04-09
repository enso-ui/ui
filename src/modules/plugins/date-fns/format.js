import format from '@enso-ui/date/src/format.js';
import { useStore } from '../../../core/services/pinia';

export default (date, formatStr = null) => {
    const state = useStore('app');
    const preferences = useStore('preferences');

    return format(
        date,
        formatStr || state.meta.dateFormat,
        preferences.global.lang,
    );
};
