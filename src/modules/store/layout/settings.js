export const state = {
    items: [],
    isVisible: false,
};

export const getters = {
    items: state => {
        return state.items.concat() // we have to use concat to prevent mutating state!
            .sort((a, b) => a.order - b.order)
            .map(item => item.component);
    },
};

export const mutations = {
    registerItem: (state, item) => {
        state.items.push(item);
    },
    toggle: state => (state.isVisible = !state.isVisible),
};
