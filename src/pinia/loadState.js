import axios from 'axios';
import App from '../core/app';
import eventBus from '../core/services/eventBus';
import { useStore } from '../core/services/pinia';
import { app as useApp } from './app';
import { layout } from './layout';
import { preferences } from './preferences';
import { websockets } from './websockets';

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
            const { default: Sentry } = await import('../modules/sentry');
            const sentry = new Sentry(App.instance, App.router);
            sentry.init(state);
        }

        eventBus.$emit('app-state-loaded');

        await layout().setTheme();
        await websockets().connect(state.meta.csrfToken);

        if (state.meta.env === 'local') {
            window.http = axios;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            useStore('auth')?.logout();
            App.router?.push({ name: 'login' });
        } else {
            throw error;
        }
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
