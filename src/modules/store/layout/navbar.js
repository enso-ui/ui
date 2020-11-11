export const state = {
    items: [],
    searchBar: false,
};

export const getters = {
    items: state => {
        const sortedItem = state.items.length < 2
            ? state.items
            : state.items.sort((a, b) => a.order - b.order);

        return sortedItem.map(item => item.component);
    },
};

export const mutations = {
    registerItem: (state, item) => {
        state.items.push(item);
    },
    showSearchBar: state => (state.searchBar = true),
    hideSearchBar: state => (state.searchBar = false),
};
