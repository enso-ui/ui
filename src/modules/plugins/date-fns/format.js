import { format, parseISO } from 'date-fns/esm';
import store from '@root/store';
import i18n from './i18n';

export default (date, formatStr = null) => format(
    (typeof date === 'string') ? parseISO(date) : date,
    formatStr || store.state.meta.dateFormat,
    { locale: i18n[store.state.preferences.global.lang] },
);
