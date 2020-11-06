export const state = {
    items: [],
    searchBar: false,
};

export const getters = {
    mobileItems: state => state.items
        .filter(item => item.mobile)
        .sort((a, b) => a.order - b.order)
        .map(item => item.component),
    desktopItems: state => state.items
        .filter(item => item.desktop)
        .sort((a, b) => a.order - b.order)
        .map(item => item.component),
};

export const mutations = {
    registerItem: (state, item) => {
        state.items.push(item);
    },
    showSearchBar: state => (state.searchBar = true),
    hideSearchBar: state => (state.searchBar = false),
};