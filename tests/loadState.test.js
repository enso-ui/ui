import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';
import App from '../src/core/app';
import { localisation } from '@enso-ui/localisation/src/pinia/localisation';
import { app } from '../src/pinia/app';
import { preferences } from '../src/pinia/preferences';
import { loadGuestState } from '../src/modules/loadState';

vi.mock('axios', () => ({
    default: {
        get: vi.fn(),
        patch: vi.fn(() => Promise.resolve({ data: {} })),
    },
}));

describe('loadState', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
        App.router = {
            currentRoute: { value: { name: 'dashboard' } },
            push: vi.fn(),
        };
        vi.clearAllMocks();
    });

    it('loads guest state into the relevant stores', async () => {
        axios.get.mockResolvedValue({
            data: {
                meta: { appName: 'Enso' },
                i18n: { ro: { Login: 'Autentificare' } },
                routes: { login: true },
            },
        });

        await loadGuestState();

        const store = localisation();
        expect(store.i18n ?? store.messages).toEqual({ ro: { Login: 'Autentificare' } });
        expect(preferences().global.lang).toBe('ro');
        expect(app().meta).toEqual({ appName: 'Enso' });
        expect(app().routes).toEqual({ login: true });
        expect(App.router.push).toHaveBeenCalledWith({ name: 'login' });
    });

    it('keeps the current route when it is already a guest route', async () => {
        App.router.currentRoute.value.name = 'login';
        axios.get.mockResolvedValue({
            data: {
                meta: { appName: 'Enso' },
                i18n: { en: { Login: 'Login' } },
                routes: { login: true },
            },
        });

        await loadGuestState();

        expect(App.router.push).not.toHaveBeenCalled();
    });
});
