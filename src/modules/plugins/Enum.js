class Enum {
    constructor(data, i18n) {
        this._internalData = data;
        this.i18n = i18n;

        Object.keys(data).forEach(key => this._assign(key));
    }

    _assign(key) {
        const prop = `${this._internalData[key]}`.split(' ').join('');

        if (!this.hasOwnProperty(prop)) {
            this[prop] = key;
        }
    }

    _get(key) {
        return this.i18n(this._internalData[key]);
    }

    _has(key) {
        return Object.prototype.hasOwnProperty
            .call(this._internalData, key);
    }

    _select() {
        return Object.keys(this._internalData).map(key => ({
            id: key, name: this.i18n(this._internalData[key]),
        }));
    }

    _filter() {
        return Object.keys(this._internalData).map(key => ({
            value: key, label: this.i18n(this._internalData[key]),
        }));
    }

    _keys() {
        return Object.keys(this._internalData);
    }

    _values() {
        return Object.keys(this._internalData)
            .map(key => this.i18n(this._internalData[key]));
    }

    _all() {
        return this._internalData;
    }

    _data() {
        return Object.keys(this._internalData).reduce((obj, key) => {
            obj[key] = this.i18n(this._internalData[key]);
            return obj;
        }, {});
    }

    _randomKey() {
        return this._keys()[this._randomIndex()];
    }

    _randomValue() {
        return this._values()[this._randomIndex()];
    }

    _randomIndex() {
        return Math.floor(Math.random()
            * Object.keys(this._internalData).length);
    }
}

export default Enum;
