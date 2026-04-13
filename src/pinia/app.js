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

    getters: {
        isWebview: () => typeof ReactNativeWebView !== 'undefined',
    },

    actions: {
        newRelease() {
            this.appUpdate = true;
        },
        setDefaultRoute(route) {
            App.router?.addRoute({
                name: 'default',
                path: '/',
                redirect: { name: route },
            });
        },
        setImpersonating(impersonating) {
            this.impersonating = impersonating;
        },
        setMeta(meta) {
            this.meta = meta;
        },
        setPageTitle(title) {
            this.meta.pageTitle = title;
        },
        setRoutes(routes) {
            this.routes = routes;
        },
        setShowQuote(value) {
            this.showQuote = value;
        },
        setUser(user) {
            this.user = user;
        },
        set({
            meta,
            user,
            routes,
            defaultRoute,
            impersonating,
        }) {
            this.setMeta(meta);
            this.setUser(user);
            this.setRoutes(routes);
            this.setDefaultRoute(defaultRoute);
            this.setImpersonating(impersonating);
        },
        updateAvatar() {
            this.avatarKey += 1;
        },
    },
});
