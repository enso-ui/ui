export const state = {
    items: [],
    searchBar: false,
};

export const getters = {
    items: state => {
        return state.items.concat()
            .sort((a, b) => a.order - b.order)
            .map(item => item.component);
    },
};

export const mutations = {
    registerItem: (state, item) => {
        state.items.push(item);
    },
    showSearchBar: state => (state.searchBar = true),
    hideSearchBar: state => (state.searchBar = false),
};
