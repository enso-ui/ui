import {
    valid, matches, stickies, map, index, persist,
} from '@core-modules/plugins/bookmarkHelpers';

export const state = {
    bookmarks: [],
    excluded: ['notFound', 'unauthorized'],
    editable: false,
};

export const getters = {
    isExcluded: state => bookmark => state.excluded.includes(bookmark.name),
    matches: () => (first, second) => matches(first, second),
    stickies: state => stickies(state.bookmarks),
    index: state => bookmark => index(state.bookmarks, bookmark),
    state: state => bookmark => state.bookmarks[index(state.bookmarks, bookmark)].state,
};

export const mutations = {
    init: (state) => {
        const bookmarks = localStorage.getItem('bookmarks');
        state.bookmarks = bookmarks && JSON.parse(bookmarks) || [];
    },
    set: (state, items) => (state.bookmarks = items),
    updateState: (state, { bookmark, data }) => {
        const current = state.bookmarks[index(state.bookmarks, bookmark)];
        current.state = data;
        persist(state.bookmarks);
    },
    setPageTitle: (state, { route, title }) => {
        const current = state.bookmarks[index(state.bookmarks, route)];
        current.meta.title = title;
        persist(state.bookmarks);
    },
    exclude: (state, items) => (state.bookmarks = state.bookmarks.concat(items)),
    push: (state, bookmark) => {
        state.bookmarks = state.bookmarks.filter(({ sticky, state }) => sticky || state);

        if (valid(state.bookmarks, bookmark)) {
            state.bookmarks.push(map(bookmark));
        }
    },
    stick: (state, bookmark) => {
        state.bookmarks[index(state.bookmarks, bookmark)].sticky = true;
        persist(state.bookmarks);
    },
    remove: (state, bookmark) => {
        state.bookmarks.splice(index(state.bookmarks, bookmark), 1);
        persist(state.bookmarks);
    },
    clear: (state, current) => {
        const bookmark = state.bookmarks[index(state.bookmarks, current)];
        bookmark.sticky = false;
        state.bookmarks = [bookmark];
        persist(state.bookmarks);
    },
};
