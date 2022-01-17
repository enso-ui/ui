export const state = {
    isVisible: false,
};

export const mutations = {
    show: state => (state.isVisible = true),
    hide: state => (state.isVisible = false),
};
