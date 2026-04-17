import guest from './before/guest';
import authRoute from './before/auth';
import { auth } from '@enso-ui/auth/src/pinia/auth';

export default (to, from, next) => {
    if (auth().isAuth) {
        authRoute(to, from, next);
    } else {
        guest(to, from, next);
    }
};
