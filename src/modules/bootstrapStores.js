const localModules = import.meta.glob(
    '/src/js/pinia/*.js',
    { eager: true },
);

const packageModules = import.meta.glob(
    '../../../*/src/pinia/*.js',
    { eager: true },
);

const isStore = store => typeof store === 'function' && typeof store.$id === 'string';

const factory = ({ __esModule, ...moduleExports }) => Object.values(moduleExports)
    .find(isStore);

export const buildStoreRegistry = modules => Object.values(modules)
    .map(factory)
    .filter(Boolean)
    .reduce((stores, store) => ({ ...stores, [store.$id]: store }), {});

export const bootstrapStoreRegistry = (registry, activePinia) => Object.values(registry)
    .forEach(store => store(activePinia));

export const bootstrapStores = activePinia => bootstrapStoreRegistry(
    buildStoreRegistry({ ...packageModules, ...localModules }),
    activePinia,
);
