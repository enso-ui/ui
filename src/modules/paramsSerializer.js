const encode = value => encodeURIComponent(value)
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']');

const scalar = value => {
    if (value === true) {
        return 1;
    }

    if (value === false) {
        return 0;
    }

    return value ?? '';
};

const append = (pairs, key, value) => {
    pairs.push(`${encode(key)}=${encode(scalar(value))}`);
};

const isPlainObject = value => Object.prototype.toString.call(value) === '[object Object]';

const visit = (pairs, key, value) => {
    if (value === null || value === undefined) {
        append(pairs, key, '');

        return;
    }

    if (Array.isArray(value)) {
        if (!value.length) {
            return;
        }

        value.forEach((item, index) => visit(pairs, `${key}[${index}]`, item));

        return;
    }

    if (value instanceof Date) {
        append(pairs, key, value.toISOString());

        return;
    }

    if (isPlainObject(value)) {
        const entries = Object.entries(value);

        if (!entries.length) {
            append(pairs, key, '');

            return;
        }

        entries.forEach(([childKey, childValue]) => visit(
            pairs,
            `${key}[${childKey}]`,
            childValue,
        ));

        return;
    }

    append(pairs, key, value);
};

export default params => {
    if (!params || typeof params !== 'object') {
        return '';
    }

    const pairs = [];

    Object.entries(params).forEach(([key, value]) => visit(pairs, key, value));

    return pairs.join('&');
};
