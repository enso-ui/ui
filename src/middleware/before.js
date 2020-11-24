import guest from './before/guest';
import auth from './before/auth';
import allow from './before/allow';

export default (to, from, next, store) => {
    if (store.state.auth.isAuth) {
        auth(to, from, next);
        allow(to, from, next, store);
    } else {
        guest(to, from, next, store);
    }
};
