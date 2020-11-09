import routeImporter from '../../modules/importers/routeImporter';
import paths from '../paths';

class RouteBuilder {
    constructor(localRoutes, profile) {
        this.profile = profile;
        this.paths = paths;
        this.localRoutes = localRoutes;
        this.routes = routeImporter(this.path('coreRoutes'));
    }

    add(routes) {
        routes.forEach(route => this.process(route));

        return this;
    }

    get() {
        this.add(routeImporter(this.path('routes')));
        this.add(routeImporter(this.localRoutes));

        return this.routes;
    }

    path(resource) {
        return this.paths[this.profile][resource];
    }

    process(route) {
        const match = this.routes.find(({ path }) => path === route.path);

        if (!match) {
            this.routes.push(route);
            return;
        }

        if (!route.meta) {
            (new RouteBuilder(match.children, this.profile))
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
    }


}

export default RouteBuilder;
