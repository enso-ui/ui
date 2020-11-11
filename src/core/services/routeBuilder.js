import Resources from './resources';
import routeImporter from '../../modules/importers/routeImporter';

class RouteBuilder {
    constructor() {
        this.routes = routeImporter(Resources.coreRoutes());
    }

    add(routes, existing) {
        routes.forEach(route => this.process(route, existing));

        return this;
    }

    handle() {
        this.add(routeImporter(Resources.routes()))
            .add(routeImporter(Resources.localRoutes()));

        return this.routes;
    }

    process(route, routes = this.routes) {
        const match = routes.find(({ path }) => path === route.path);

        if (!match) {
            routes.push(route);
            return;
        }

        if (!route.meta) {
            this.add(route.children, match.children);

            return;
        }

        if (route.children) {
            match.children = route.children;
        }

        if (route.component) {
            match.component = route.component;
        }

        match.meta = route.meta;
    }
}

export default RouteBuilder;
