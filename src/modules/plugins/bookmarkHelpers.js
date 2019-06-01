const matches = (first, second) => first.name === second.name
    && Object.keys(first.params)
        .every(key => first.params[key] == second.params[key])
    && Object.keys(first.query)
        .every(key => first.query[key] == second.query[key]);

const valid = (bookmarks, bookmark) => bookmark && bookmark.name
    && !bookmark.meta.guestGuard
    && !bookmarks.some(existing => matches(existing, bookmark));

const map = bookmark => ({
    name: bookmark.name,
    meta: bookmark.meta,
    params: bookmark.params,
    query: bookmark.query,
    sticky: false,
    state: null,
});

const index = (bookmarks, bookmark) => bookmarks.findIndex(existing => matches(existing, bookmark));

const stickies = bookmarks => bookmarks.filter(({ sticky, state }) => sticky || state);

const persist = (bookmarks) => {
    localStorage.setItem('bookmarks', JSON.stringify(stickies(bookmarks)));
};

export {
    valid, matches, stickies, map, index, persist,
};
