const routeImporter = requireContext => requireContext.keys()
    .map(fileName => requireContext(fileName))
    .reduce((routes, route) => (Array.isArray(route.default)
        ? [...routes, ...route.default]
        : [...routes, route.default]), []);

const makeContext = modules => {
    const map = Object.fromEntries(Object.entries(modules));
    const keys = Object.keys(map);

    const context = key => {
        if (!(key in map)) {
            const error = new Error(`Cannot find module '${key}'`);
            error.code = 'MODULE_NOT_FOUND';
            throw error;
        }

        return map[key];
    };

    context.keys = () => keys;
    context.resolve = key => key;
    context.id = 'vite-require-context';

    return context;
};

routeImporter.fromGlob = modules => routeImporter(makeContext(modules));

export default routeImporter;
