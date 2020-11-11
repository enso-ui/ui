import store from '../../../core/services/store';
import formatDistance from '@enso-ui/date/src/formatDistance.js';

export default date => formatDistance(date, store.state.preferences.global.lang);
