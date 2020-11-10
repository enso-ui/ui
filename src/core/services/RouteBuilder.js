import routeImporter from '../../modules/importers/routeImporter';
import paths from '../paths';

class RouteBuilder {
    constructor(localRoutes, profile) {
        this.profile = profile;
        this.paths = paths;
        this.localRoutes = localRoutes;
        this.routes = routeImporter(this.path('coreRoutes'));
    }

    add(newRoutes, routes = this.routes) {
        newRoutes.forEach(route => this.process(route, routes));

        return this;
    }

    get() {
        this.add(routeImporter(this.path('routes')));

        return this.routes;
    }

    path(resource) {
        return this.paths[this.profile][resource];
    }

    process(route, routes) {
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
