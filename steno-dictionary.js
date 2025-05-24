export class StenoDictionary {
    constructor (...args) {
        this.add(...args);
    }

    add (...args) {
        Object.assign(this, ...args);
    }

    async fetchDictionary (url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
      
            const json = await response.json();
            console.log(json);
            this.add(json);
        } catch (error) {
            console.error(error.message);
        }
    }
} 