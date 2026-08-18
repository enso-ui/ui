import guest from './before/guest';
import authRoute from './before/auth';
import { auth } from '@enso-ui/auth/src/pinia/auth';

export default (to, from, next) => auth().isAuth
    ? authRoute(to, from, next)
    : guest(to, from, next);
