import { beforeEach, describe, expect, it, vi } from 'vitest';

const useStore = vi.fn();

vi.mock('../../../src/core/services/pinia', () => ({
    useStore,
}));

describe('guest middleware', () => {
    beforeEach(() => {
        useStore.mockReset();
        window.history.replaceState({}, '', '/projects');
    });

    it('allows guest routes without redirecting', async () => {
        useStore.mockReturnValue({ setIntendedPath: vi.fn() });

        const next = vi.fn();
        const middleware = (await import('../../../src/middleware/before/guest')).default;

        middleware({ meta: { guestGuard: true } }, {}, next);

        expect(next).toHaveBeenCalledWith();
    });

    it('stores the intended path before redirecting to login', async () => {
        const auth = { setIntendedPath: vi.fn() };
        useStore.mockReturnValue(auth);

        const next = vi.fn();
        const middleware = (await import('../../../src/middleware/before/guest')).default;

        middleware({ meta: {} }, {}, next);

        expect(auth.setIntendedPath).toHaveBeenCalledWith('/projects');
        expect(next).toHaveBeenCalledWith({ name: 'login' });
    });

    it('skips storing the intended path for the home path', async () => {
        const auth = { setIntendedPath: vi.fn() };
        useStore.mockReturnValue(auth);
        window.history.replaceState({}, '', '/');

        const next = vi.fn();
        const middleware = (await import('../../../src/middleware/before/guest')).default;

        middleware({ meta: {} }, {}, next);

        expect(auth.setIntendedPath).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ name: 'login' });
    });
});
