import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import AppUpdate from '../src/bulma/components/navbar/AppUpdate.vue';
import Search from '../src/core/components/navbar/Search.vue';
import { app } from '../src/pinia/app';
import { layout } from '../src/pinia/layout';
import { websockets } from '../src/pinia/websockets';

describe('ui navbar components', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        app().$patch({ meta: { csrfToken: 'csrf' }, appUpdate: false });
        layout().navbar.isVisible = false;
        websockets().$patch({ channels: null, pusher: null, authEndpoint: null });
        delete window.Echo;
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    it('opens search from the keyboard shortcut outside editable controls', () => {
        const event = {
            target: { tagName: 'DIV', isContentEditable: false },
            key: '/',
            ctrlKey: false,
            preventDefault: vi.fn(),
        };
        const vm = { showSearch: vi.fn() };

        Search.methods.keyDown.call(vm, event);

        expect(vm.showSearch).toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('hides search on escape when the navbar search is visible', () => {
        layout().navbar.isVisible = true;

        const event = {
            target: { tagName: 'DIV', isContentEditable: false },
            key: 'Escape',
            ctrlKey: false,
            preventDefault: vi.fn(),
        };

        Search.methods.keyDown.call({}, event);

        expect(layout().navbar.isVisible).toBe(false);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('keeps retrying app update listener setup until echo and channels are ready', () => {
        const timer = vi.spyOn(globalThis, 'setTimeout').mockReturnValue(1);
        const vm = {
            listening: false,
            ws: { channels: null },
            ensureListener: vi.fn(),
        };

        AppUpdate.methods.ensureListener.call(vm);

        expect(timer).toHaveBeenCalledWith(expect.any(Function), 250);
        expect(vm.listening).toBe(false);
        expect(vm.ensureListener).not.toHaveBeenCalled();
    });

    it('connects and listens for app updates when websocket config is ready', async () => {
        window.Echo = {};

        const vm = {
            listening: false,
            ws: {
                channels: { appUpdates: 'app.updates' },
                connect: vi.fn(() => Promise.resolve()),
            },
            state: { meta: { csrfToken: 'csrf' } },
            listen: vi.fn(),
        };

        AppUpdate.methods.ensureListener.call(vm);
        await Promise.resolve();

        expect(vm.listening).toBe(true);
        expect(vm.ws.connect).toHaveBeenCalledWith('csrf');
        expect(vm.listen).toHaveBeenCalled();
    });

    it('marks a new release and opens the navbar item after receiving an update', () => {
        const newRelease = vi.fn();
        const show = vi.fn();
        const vm = {
            state: { newRelease },
            message: 'old',
            $refs: { navbarItem: { show } },
            $nextTick: callback => callback(),
        };

        AppUpdate.methods.handle.call(vm, { message: 'updated' });

        expect(newRelease).toHaveBeenCalled();
        expect(vm.message).toBe('updated');
        expect(show).toHaveBeenCalled();
    });
});
