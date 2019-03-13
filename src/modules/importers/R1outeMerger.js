class RouteMerger {
    constructor(routes) {
        this.routes = routes;
    }

    add(routes) {
        routes.forEach((route) => {
            const match = this.routes.find(({ path }) => path === route.path);

            if (!match) {
                this.routes.push(route);
                return;
            }

            if (!route.meta) {
                (new RouteMerger(match.children))
                    .add(route.children);
                return;
            }

            if (route.children) {
                match.children = route.children;
            }

            if (route.component) {
                match.component = route.component;
            }

            match.meta = route.meta;
        });

        return this;
    }
}

export default RouteMerger;
