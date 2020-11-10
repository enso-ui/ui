class Bus {
    constructor() {
        this.listeners = {};
    }

    subscribe(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
    }

    emit(event, data) {
        (this.listeners[event] || []).forEach(callback => callback(data));
    }
}

export default new Bus();
