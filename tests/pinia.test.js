import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';
import App from '../src/core/app';
import { app } from '../src/pinia/app';
import { layout } from '../src/pinia/layout';
import { preferences } from '../src/pinia/preferences';

vi.mock('axios', () => ({
    default: {
        patch: vi.fn(() => Promise.resolve({ data: {} })),
    },
}));

describe('ui pinia stores', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.style.colorScheme = '';
        App.router = { addRoute: vi.fn(), currentRoute: { value: { name: 'dashboard' } } };
        vi.clearAllMocks();
    });

    it('sets app state with a strict payload', () => {
        const store = app();

        store.set({
            meta: { appName: 'Enso' },
            user: { id: 1 },
            routes: { dashboard: true },
            defaultRoute: 'dashboard',
            impersonating: { id: 2 },
        });

        expect(store.meta).toEqual({ appName: 'Enso' });
        expect(store.user).toEqual({ id: 1 });
        expect(store.routes).toEqual({ dashboard: true });
        expect(store.impersonating).toEqual({ id: 2 });
        expect(App.router.addRoute).toHaveBeenCalledWith({
            name: 'default',
            path: '/',
            redirect: { name: 'dashboard' },
        });
    });

    it('stores language preference and persists it', async () => {
        const store = preferences();

        store.set({ global: { lang: 'en' }, local: {} });

        await store.setLang('ro');

        expect(store.global.lang).toBe('ro');
        expect(localStorage.getItem('locale')).toBe('ro');
        expect(axios.patch).toHaveBeenCalledWith('/api/core/preferences/store', {
            global: store.global,
        });
    });

    it('updates theme through layout and persists it', async () => {
        const prefs = preferences();
        const ui = layout();

        prefs.set({ global: { theme: 'light' }, local: {} });

        await prefs.setTheme('dark');

        expect(prefs.global.theme).toBe('dark');
        expect(ui.setTheme()).toBe('dark');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(document.documentElement.style.colorScheme).toBe('dark');
        expect(axios.patch).toHaveBeenCalledWith('/api/core/preferences/store', {
            global: prefs.global,
        });
    });

    it('updates sidebar state and keeps layout in sync', async () => {
        const prefs = preferences();
        const ui = layout();

        prefs.set({ global: { expandedSidebar: true }, local: {} });

        await prefs.setSidebarState(false);

        expect(prefs.global.expandedSidebar).toBe(false);
        expect(ui.sidebar.isExpanded).toBe(false);
        expect(axios.patch).toHaveBeenCalledWith('/api/core/preferences/store', {
            global: prefs.global,
        });
    });

    it('toggles the sidebar differently on touch devices', () => {
        const store = layout();

        store.isTouch = true;
        store.sidebar.isExpanded = false;
        store.sidebar.isVisible = false;
        store.toggleSidebar();

        expect(store.sidebar.isExpanded).toBe(true);
        expect(store.sidebar.isVisible).toBe(true);

        store.isTouch = false;
        store.sidebar.isExpanded = true;
        store.sidebar.isVisible = false;
        store.toggleSidebar();

        expect(store.sidebar.isVisible).toBe(true);
        expect(store.sidebar.isExpanded).toBe(false);
    });
});
