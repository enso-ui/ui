const levelMatches = (menus, menuId) => menus.some(({ id }) => id === menuId);

const changeLevel = (menus, organizedMenus) => menus.filter(({ hasChildren }) => hasChildren)
    .find(menu => organize(menu, organizedMenus)) !== undefined;

const organize = (menu, organizedMenus) => {
    if (levelMatches(menu.children, organizedMenus[0].id)) {
        menu.children = organizedMenus;
        return true;
    }

    return changeLevel(menu.children, organizedMenus);
};

export default organize;
