const reloadKey = 'enso:preload-reload';

const reloadCooldown = 10_000;

const errorPatterns = [
    /Failed to fetch dynamically imported module/,
    /Importing a module script failed/,
];

let reloading = false;

const reload = () => {
    if (reloading) {
        return true;
    }

    const lastReload = Number(sessionStorage.getItem(reloadKey) ?? 0);

    if (Date.now() - lastReload < reloadCooldown) {
        return false;
    }

    reloading = true;
    sessionStorage.setItem(reloadKey, String(Date.now()));
    window.location.reload();

    return true;
};

const handlePreloadError = event => {
    if (reload()) {
        event.preventDefault();
    }
};

const isChunkLoadError = error => errorPatterns
    .some(pattern => pattern.test(error.message));

const handleRouterError = error => {
    if (!isChunkLoadError(error) || !reload()) {
        throw error;
    }
};

export { handlePreloadError, handleRouterError };
