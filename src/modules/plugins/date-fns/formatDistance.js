// eslint-disable-next-line import/no-unresolved
import store from '@root/store';
import formatDistance from '@enso-ui/date/src/formatDistance.js';

export default date => formatDistance(date, store.state.preferences.global.lang);
