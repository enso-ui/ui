import axios from 'axios';
import { defineStore } from 'pinia';
import { layout } from './layout';

const store = payload => axios.patch('/api/core/preferences/store', payload);

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
    },

    actions: {
        set({ global, local = {} }) {
            this.global = global;
            this.local = local;
        },
        async setLang(lang) {
            this.global.lang = lang;
            localStorage.setItem('locale', lang);
            await store({ global: this.global });
        },
        async setTheme(theme) {
            this.global.theme = theme;
            await layout().setTheme(theme);
            await store({ global: this.global });
        },
        async setToastrPosition(position) {
            this.global.toastrPosition = position;
            await store({ global: this.global });
        },
        async setBookmarksState(bookmarks) {
            this.global.bookmarks = bookmarks;
            await store({ global: this.global });
        },
        async setSidebarState(state) {
            this.global.expandedSidebar = state;
            layout().updateSidebar(state);
            await store({ global: this.global });
        },
    },
});
