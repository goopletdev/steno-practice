export class StenoDictionary {
    constructor (...args) {
        this.add(...args);
    }

    add (...args) {
        Object.assign(this, ...args);
    }
} 