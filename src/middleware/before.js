import guest from './before/guest';
import auth from './before/auth';
import { useStore } from '../core/services/pinia';

export default (to, from, next) => {
    if (useStore('auth')?.isAuth) {
        auth(to, from, next);
    } else {
        guest(to, from, next);
    }
};
