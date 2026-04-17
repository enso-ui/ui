import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { app } from '../src/pinia/app';
import { preferences } from '../src/pinia/preferences';
import PageHeader from '../src/core/components/PageHeader.vue';
import DocumentTitle from '../src/core/components/DocumentTitle.vue';
import Breadcrumbs from '../src/core/components/Breadcrumbs.vue';

describe('ui core components', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        app().$patch({ meta: {}, routes: {} });
        preferences().set({ global: { lang: 'en' }, local: {} });
        document.title = '';
    });

    it('page header sets the page title from route meta', () => {
        PageHeader.created.call({
            $route: { meta: { title: 'Dashboard' } },
        });

        expect(app().meta.pageTitle).toBe('Dashboard');
    });

    it('page header exposes the stored page title to the slot', () => {
        const slot = vi.fn(() => null);
        app().meta.pageTitle = 'Invoices';

        PageHeader.render.call({
            $slots: { default: slot },
        });

        expect(slot).toHaveBeenCalledWith({ pageTitle: 'Invoices' });
    });

    it('document title uses the app meta when building the browser title', () => {
        app().meta = { extendedDocumentTitle: true, appName: 'Enso' };
        const vm = {
            $route: { name: 'dashboard', meta: { title: 'Dashboard' } },
            i18n: value => value,
        };

        expect(DocumentTitle.computed.documentTitle.call(vm)).toBe('Dashboard | Enso');
    });

    it('breadcrumbs expose navigation only for navigable parents', () => {
        const slot = vi.fn(() => null);
        const vm = {
            $route: {
                name: 'invoices.index',
                meta: { breadcrumb: 'Invoices' },
                matched: [
                    { meta: { breadcrumb: 'Dashboard', route: 'dashboard' } },
                    { meta: { breadcrumb: 'Invoices', route: 'invoices.index' } },
                ],
            },
            get breadcrumbs() {
                return Breadcrumbs.computed.breadcrumbs.call(this);
            },
            $slots: { default: slot },
        };

        Breadcrumbs.render.call(vm);

        const { breadcrumbs, hasNavigation } = slot.mock.calls[0][0];

        expect(breadcrumbs).toEqual([
            { name: 'Dashboard', route: 'dashboard' },
            { name: 'Invoices', route: 'invoices.index' },
        ]);
        expect(hasNavigation(breadcrumbs[0])).toBe(true);
        expect(hasNavigation(breadcrumbs[1])).toBe(false);
    });
});
