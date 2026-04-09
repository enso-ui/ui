import formatDistance from '@enso-ui/date/src/formatDistance.js';
import { useStore } from '../../../core/services/pinia';

export default date => formatDistance(date, useStore('preferences').global.lang);
