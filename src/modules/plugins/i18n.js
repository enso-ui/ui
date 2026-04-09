import { useStore } from '../../core/services/pinia';

export default (key, params = null) => {
    if (key === null || key === '' || typeof key === 'undefined') {
        return null;
    }

    const localisation = useStore('localisation');

    if (!localisation?.ready) {
        return key;
    }

    let translation = localisation.translate(key);

    if (typeof translation === 'undefined' || translation === null) {
        translation = key;

        if (localisation.keyCollector) {
            localisation.addMissingKey(key);
        }
    }

    return !!params && typeof params === 'object'
        ? translation.replace(/:(\w*)/g, (e, key) => {
            if (typeof params[key.toLowerCase()] === 'undefined') {
                return key;
            }

            const param = params[key.toLowerCase()];

            if (key === key.toUpperCase()) {
                return param.toUpperCase();
            }

            return key[0] === key[0].toUpperCase()
                ? param.charAt(0).toUpperCase() + param.slice(1)
                : param;
        })
        : translation || key;
};
