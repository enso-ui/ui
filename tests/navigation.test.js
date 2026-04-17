import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { auth } from '@enso-ui/auth/src/pinia/auth';
import { app } from '../src/pinia/app';
import { layout } from '../src/pinia/layout';
import Loader from '../src/core/components/Loader.vue';
import Home from '../src/core/layouts/Home.vue';
import before from '../src/middleware/before';
import guest from '../src/middleware/before/guest';
import authRoute from '../src/middleware/before/auth';

vi.mock('../src/middleware/before/guest', () => ({
    default: vi.fn(),
}));

vi.mock('../src/middleware/before/auth', () => ({
    default: vi.fn(),
}));

describe('ui navigation and loader', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        app().$patch({ meta: {}, routes: {}, showQuote: false });
        layout().$patch({ home: true });
        auth().$patch({ intendedRoute: null, intendedPath: null, isAuth: false });
        vi.clearAllMocks();
    });

    it('routes middleware to the guest branch when unauthenticated', () => {
        const next = vi.fn();

        before({ name: 'login' }, { name: 'dashboard' }, next);

        expect(guest).toHaveBeenCalledWith({ name: 'login' }, { name: 'dashboard' }, next);
        expect(authRoute).not.toHaveBeenCalled();
    });

    it('routes middleware to the auth branch when authenticated', () => {
        const next = vi.fn();
        auth().isAuth = true;

        before({ name: 'dashboard' }, { name: 'login' }, next);

        expect(authRoute).toHaveBeenCalledWith({ name: 'dashboard' }, { name: 'login' }, next);
        expect(guest).not.toHaveBeenCalled();
    });

    it('loader exposes visibility and progress from the store', () => {
        const slot = vi.fn(() => null);
        const state = require('../src/pinia/loader').loader();
        state.visible = true;
        state.waveTotal = 4;
        state.waveCompleted = 1;

        Loader.render.call({
            $slots: { default: slot },
        });

        expect(slot).toHaveBeenCalledWith({
            visible: true,
            progress: state.progress,
        });
    });

    it('home redirects to the intended route and clears it', async () => {
        const push = vi.fn(() => Promise.resolve());
        const vm = {
            $router: { push },
            $route: { meta: {} },
            routerErrorHandler: vi.fn(),
        };

        auth().setIntendedRoute({ name: 'invoices.index', params: { id: 1 }, query: { page: 2 } });

        await Home.methods.redirectIfNeeded.call(vm);

        expect(push).toHaveBeenCalledWith({
            name: 'invoices.index',
            params: { id: 1 },
            query: { page: 2 },
        });
        expect(auth().intendedRoute).toBeNull();
    });

    it('home hides the quote when the app should enter directly', () => {
        const vm = {
            loading: true,
            redirectIfNeeded: vi.fn(),
        };

        app().showQuote = false;
        layout().setHome(true);

        Home.methods.enterApp.call(vm);

        expect(vm.redirectIfNeeded).toHaveBeenCalled();
        expect(vm.loading).toBe(false);
        expect(layout().home).toBe(false);
    });
});
