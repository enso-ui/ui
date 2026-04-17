import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import Root from '../src/core/Root.vue';
import { app } from '../src/pinia/app';
import { preferences } from '../src/pinia/preferences';
import { layout } from '../src/pinia/layout';
import { localisation } from '@enso-ui/localisation/src/pinia/localisation';
import { auth } from '@enso-ui/auth/src/pinia/auth';

describe('ui root', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        app().$patch({ meta: { appUrl: 'https://enso.test' }, routes: { dashboard: true } });
        layout().$patch({ home: true });
        localisation().rtlLanguages = [];
        localisation().setI18n({ en: {} });
        auth().isAuth = false;
        document.body.removeAttribute('dir');
    });

    it('loads the theme on create', async () => {
        const spy = vi.spyOn(layout(), 'setTheme').mockResolvedValue('light');

        await Root.created.call({});

        expect(spy).toHaveBeenCalled();
    });

    it('sets document direction from localisation on before mount', () => {
        preferencesLanguage('ar');
        localisation().rtlLanguages = ['ar'];

        Root.beforeMount.call({});

        expect(document.body.getAttribute('dir')).toBe('rtl');
    });

    it('checks route access against app routes', () => {
        expect(Root.methods.canAccess.call({}, 'dashboard')).toBe(true);
        expect(Root.methods.canAccess.call({}, 'missing')).toBe(false);
    });

    it('renders auth and home state into the slot', () => {
        const slot = vi.fn(() => null);
        auth().isAuth = true;
        layout().home = false;

        Root.render.call({
            $slots: { default: slot },
        });

        expect(slot).toHaveBeenCalledWith({ isAuth: true, home: false });
    });
});

const preferencesLanguage = lang => {
    preferences().set({ global: { lang }, local: {} });
};
