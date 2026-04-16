import formatDistance from '@enso-ui/date/src/formatDistance.js';
import { preferences } from '../../../pinia/preferences';

export default date => formatDistance(date, preferences().global.lang);
