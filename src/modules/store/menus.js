import organize from '@core-modules/plugins/menuOrganizer';

export const state = {
    list: [],
    editable: false,
};

export const mutations = {
    set: (state, menuList) => (state.list = menuList),
    toggle: (state, menu) => (menu.expanded = !menu.expanded),
    expand: (state, menu) => (menu.expanded = true),
    collapse: (state, menu) => (menu.expanded = false),
    edit: (state, status) => (state.editable = status),
    organize: (state, organizedMenus) => {
        state.children = state.list;
        organize(state, organizedMenus);
        state.list = state.children;
        delete state.children;
    }
};
