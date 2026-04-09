const makeContext = (modules, { keyTransform } = {}) => {
    const entries = Object.entries(modules).map(([key, value]) => [
        keyTransform ? keyTransform(key) : key,
        value,
    ]);

    const map = Object.fromEntries(entries);
    const keys = Object.keys(map);

    const context = (key) => {
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

const localRoutes = () => makeContext(
    import.meta.glob('/src/js/routes/*.js', { eager: true }),
    {
        keyTransform: key => key.replace('/src/js/routes/', './'),
    },
);

const coreRoutes = () => makeContext(
    import.meta.glob('/node_modules/@enso-ui/ui/src/bulma/routes/*.js', { eager: true }),
);

const icons = () => makeContext(
    import.meta.glob('/node_modules/@enso-ui/**/src/icons.js', { eager: true }),
);

const register = () => makeContext(
    import.meta.glob('/node_modules/@enso-ui/**/src/bulma/register.js', { eager: true }),
);

const routes = () => makeContext(
    import.meta.glob('/node_modules/@enso-ui/**/src/bulma/routes/*.js', { eager: true }),
);

export default {
    bulma: { coreRoutes, icons, register, routes },
    local: {
        routes: localRoutes,
    },
};
