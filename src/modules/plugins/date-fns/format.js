import format from '@enso-ui/date/src/format.js';
import { app } from '../../../pinia/app';
import { preferences } from '../../../pinia/preferences';

export default (date, formatStr = null) => {
    const state = app();
    const userPreferences = preferences();

    return format(
        date,
        formatStr || state.meta.dateFormat,
        userPreferences.global.lang,
    );
};
