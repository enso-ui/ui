import { beforeEach, describe, expect, it, vi } from 'vitest';

const useStore = vi.fn();

vi.mock('../../../src/core/services/pinia', () => ({
    useStore,
}));

describe('auth middleware', () => {
    beforeEach(() => {
        useStore.mockReset();
    });

    it('redirects guest-guarded routes to home', async () => {
        useStore.mockReturnValue({ appUpdate: false, meta: {}, routes: {} });

        const next = vi.fn();
        const middleware = (await import('../../../src/middleware/before/auth')).default;

        middleware({ meta: { guestGuard: true } }, {}, next);

        expect(next).toHaveBeenCalledWith({ path: '/' });
    });

    it('blocks navigation while an app update is pending', async () => {
        useStore.mockReturnValue({ appUpdate: true, meta: {}, routes: {} });

        const next = vi.fn();
        const middleware = (await import('../../../src/middleware/before/auth')).default;

        middleware({ name: 'dashboard', meta: {} }, {}, next);

        expect(next).toHaveBeenCalledWith(false);
    });

    it('redirects unauthorized routes to the unauthorized page', async () => {
        useStore.mockReturnValue({
            appUpdate: false,
            meta: { appUrl: 'https://app.test' },
            routes: { dashboard: true },
        });

        const next = vi.fn();
        const middleware = (await import('../../../src/middleware/before/auth')).default;

        middleware({ name: 'projects', meta: {} }, {}, next);

        expect(next).toHaveBeenCalledWith({ name: 'unauthorized' });
    });

    it('allows registered routes', async () => {
        useStore.mockReturnValue({
            appUpdate: false,
            meta: { appUrl: 'https://app.test' },
            routes: { projects: true },
        });

        const next = vi.fn();
        const middleware = (await import('../../../src/middleware/before/auth')).default;

        middleware({ name: 'projects', meta: {} }, {}, next);

        expect(next).toHaveBeenCalledWith();
    });
});
