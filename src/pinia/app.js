import { defineStore } from 'pinia';
import App from '../core/app';

export const app = defineStore('app', {
    state: () => ({
        appUpdate: false,
        impersonating: null,
        meta: {},
        routes: {},
        showQuote: false,
        user: {},
        avatarKey: 1,
    }),

    actions: {
        newRelease() {
            this.appUpdate = true;
        },
        setPageTitle(title) {
            this.meta.pageTitle = title;
        },
        setShowQuote(value) {
            this.showQuote = value;
        },
        set({
            meta,
            user,
            routes,
            defaultRoute,
            impersonating,
        }) {
            this.meta = meta;
            this.user = user;
            this.routes = routes;
            this.impersonating = impersonating;

            App.router?.addRoute({
                name: 'default',
                path: '/',
                redirect: { name: defaultRoute },
            });
        },
        updateAvatar() {
            this.avatarKey += 1;
        },
    },
});
