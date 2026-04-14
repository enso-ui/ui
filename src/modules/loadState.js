import axios from 'axios';
import App from '../core/app';
import { useStore } from '../core/services/pinia';
import { auth } from '@enso-ui/auth/src/pinia/auth';
import { app as useApp } from '../pinia/app';
import { layout } from '../pinia/layout';
import { preferences } from '../pinia/preferences';
import { websockets } from '../pinia/websockets';

const load = (name, payload) => {
    const store = useStore(name);

    if (!store) {
        throw new Error(`Unknown Pinia store "${name}"`);
    }

    if (typeof store.set !== 'function') {
        throw new Error(`Store "${name}" must expose set(payload)`);
    }

    store.set(payload);

    return store;
};

export const loadAppState = async (state = useApp()) => {
    try {
        const { data } = await axios.get('/api/core/home');

        data.forEach(({ store, state: payload }) => load(store, payload));

        layout().updateSidebar(preferences().global.expandedSidebar);
        window.Laravel = state.meta.csrfToken;

        if (state.meta.sentryDsn) {
            const { default: Sentry } = await import('./sentry');
            const sentry = new Sentry(App.instance, App.router);
            sentry.init(state);
        }

        await layout().setTheme();
        await websockets().connect(state.meta.csrfToken);

        if (state.meta.env === 'local') {
            window.http = axios;
        }

        return true;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            auth().logoutState();
            App.router.push({ name: 'login' });
            return false;
        }

        throw error;
    }
};

export const loadGuestState = async (state = useApp()) => {
    const { data } = await axios.get('/api/meta', {
        params: { locale: localStorage.getItem('locale') },
    });

    const { meta, i18n, routes } = data;
    const lang = Object.keys(i18n).shift();

    useStore('localisation')?.setI18n(i18n);
    preferences().setLangValue(lang);
    state.setMeta(meta);
    state.setRoutes(routes);

    const loginRoutes = ['login', 'password.email', 'password.reset'];
    const route = App.router?.currentRoute?.value;

    if (!route || !loginRoutes.includes(route.name)) {
        App.router?.push({ name: 'login' });
    }
};
