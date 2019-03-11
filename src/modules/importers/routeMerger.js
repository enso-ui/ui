const routeMerger = (localRoutes, routes) => {
    localRoutes.forEach((localRoute) => {
        const match = routes.find(({ path }) => path === localRoute.path);

        if (!match) {
            routes.push(localRoute);
            return;
        }

        if (!localRoute.meta) {
            routeMerger(localRoute.children, match.children);
            return;
        }

        if (localRoute.children) {
            match.children = localRoute.children;
        }

        if (localRoute.component) {
            match.component = localRoute.component;
        }

        match.meta = localRoute.meta;
    });
};

export default routeMerger;
