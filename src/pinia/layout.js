import { defineStore } from 'pinia';
import { preferences } from './preferences';

const root = () => document.documentElement;

const applyTheme = theme => {
    const element = root();

    if (theme === 'system') {
        element.removeAttribute('data-theme');
        element.style.colorScheme = 'light dark';
    } else {
        element.style.colorScheme = theme;
        element.setAttribute('data-theme', theme);
    }
};

export const layout = defineStore('layout', {
    state: () => ({
        home: true,
        isMobile: false,
        isTablet: false,
        isTouch: false,
        footer: true,
        header: true,
        themes: [],
        sidebar: {
            isExpanded: true,
            isVisible: true,
        },
        navbar: {
            isVisible: false,
        },
        settings: {
            isVisible: false,
        },
    }),

    actions: {
        set({ themes }) {
            this.themes = themes;
        },
        setHome(status) {
            this.home = status;
        },
        setIsMobile(isMobile) {
            this.isMobile = isMobile;
        },
        setIsTablet(isTablet) {
            this.isTablet = isTablet;
        },
        setIsTouch(isTouch) {
            this.isTouch = isTouch;
        },
        hideFooter() {
            this.footer = false;
        },
        showFooter() {
            this.footer = true;
        },
        hideHeader() {
            this.header = false;
        },
        showHeader() {
            this.header = true;
        },
        showSidebar() {
            this.sidebar.isVisible = true;
        },
        hideSidebar() {
            this.sidebar.isVisible = false;
        },
        expandSidebar() {
            this.sidebar.isExpanded = true;
        },
        collapseSidebar() {
            this.sidebar.isExpanded = false;
        },
        updateSidebar(status) {
            this.sidebar.isExpanded = status;
        },
        toggleSidebar() {
            if (this.isTouch) {
                this.sidebar.isExpanded = true;
                this.sidebar.isVisible = !this.sidebar.isVisible;
                return;
            }

            this.sidebar.isVisible = true;
            this.sidebar.isExpanded = !this.sidebar.isExpanded;
        },
        showNavbar() {
            this.navbar.isVisible = true;
        },
        hideNavbar() {
            this.navbar.isVisible = false;
        },
        toggleSettings() {
            this.settings.isVisible = !this.settings.isVisible;
        },
        setTheme(theme = null) {
            const nextTheme = theme ?? preferences().global.theme;

            applyTheme(nextTheme);

            return nextTheme;
        },
        loadTheme() {
            return this.setTheme();
        },
        switchTheme(theme = null) {
            return this.setTheme(theme);
        },
    },
});
