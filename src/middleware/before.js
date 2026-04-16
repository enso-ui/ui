import guest from './before/guest';
import auth from './before/auth';
import { auth as useAuth } from '@enso-ui/auth/src/pinia/auth';

export default (to, from, next) => {
    if (useAuth().isAuth) {
        auth(to, from, next);
    } else {
        guest(to, from, next);
    }
};
