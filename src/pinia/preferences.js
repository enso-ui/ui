import axios from 'axios';
import { defineStore } from 'pinia';
import App from '../core/app';
import { layout } from './layout';

const storePreference = payload => axios.patch('/api/core/preferences/store', payload);

export const preferences = defineStore('preferences', {
    state: () => ({
        global: {},
        local: {},
    }),

    getters: {
        lang: state => state.global.lang,
        theme: state => state.global.theme,
        expandedSidebar: state => state.global.expandedSidebar,
        toastrPosition: state => state.global.toastrPosition,
        bookmarks: state => state.global.bookmarks,
        localByRoute: state => route => state.local[route],
    },

    actions: {
        set(preferences) {
            this.global = preferences.global;
            this.local = preferences.local;
        },
        setGlobalValue({ key, value }) {
            this.global[key] = value;
        },
        setLangValue(lang) {
            this.global.lang = lang;
        },
        setThemeValue(theme) {
            this.global.theme = theme;
        },
        setToastrPositionValue(position) {
            this.global.toastrPosition = position;
        },
        setExpandedSidebarValue(expandedSidebar) {
            this.global.expandedSidebar = expandedSidebar;
        },
        setBookmarksValue(bookmarks) {
            this.global.bookmarks = bookmarks;
        },
        setLocalValue(value) {
            const route = App.router.currentRoute.value;

            if (route?.name) {
                this.local[route.name] = value;
            }
        },
        async setGlobal(payload) {
            this.setGlobalValue(payload);
            await storePreference({ global: this.global });
        },
        async setLocal(value) {
            this.setLocalValue(value);

            const route = App.router.currentRoute.value;

            if (route?.name) {
                await storePreference({ route: route.name, value });
            }
        },
        async setLang(lang) {
            this.setLangValue(lang);
            localStorage.setItem('locale', lang);
            await storePreference({ global: this.global });
        },
        async setTheme(theme) {
            this.setThemeValue(theme);
            await layout().switchTheme(theme);
            await storePreference({ global: this.global });
        },
        async setToastrPosition(position) {
            this.setToastrPositionValue(position);
            await storePreference({ global: this.global });
        },
        async setBookmarksState(bookmarks) {
            this.setBookmarksValue(bookmarks);
            await storePreference({ global: this.global });
        },
        async setSidebarState(state) {
            this.setExpandedSidebarValue(state);
            layout().updateSidebar(state);
            await storePreference({ global: this.global });
        },
    },
});
