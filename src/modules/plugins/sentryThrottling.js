const errors = [];

const reportable = event => {
    const [{ type, value }] = event.exception.values;
    const key = `${type}:${value}`;

    if (errors.includes(key)) {
        return null;
    }
    
    errors.push(key);

    setTimeout(() => {
        const index = errors.findIndex(error => error === key);
        errors.splice(index, 1);
    }, 1000 * 60 * 5);

    return event;
};

export default reportable;