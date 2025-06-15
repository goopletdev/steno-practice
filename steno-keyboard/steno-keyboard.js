import { CONFIG } from "../theory-config/config.js";

class Output {
    static STENORDER = "#STKPWHRAO*EUFRPBLGTSDZ";

    #papertape = new Array(23);
    separator = -1;
    #raw;
    #paper;
    #translation;

    constructor (keys, dictionary) {
        this.dictionary = dictionary;
        for (const key of keys) {
            this.#papertape[key] = Output.STENORDER[key];
            if (this.separator && key >= 8) {
                if (key > 12) this.separator = 1;
                else this.separator = 0;
            }
            if (this.separator && key > 12) this.separator = 1;
            else if (this.separator && key >= 8) this.separator = 0;
        }
        if (this.separator === -1) this.separator = 0;
    }

    get translation () {
        if (this.#translation || this.#translation === null) return this.#translation;
        return this.#translation = this.dictionary[this.raw] || null;
    }

    get raw () {
        if (this.#raw) return this.#raw;

        let rawOutput = [];
        for (let i = 0; i < 23; i++) {
            if (this.#papertape[i]) rawOutput.push(Output.STENORDER[i]);
            else if (i === 12 && this.separator) rawOutput.push('-');
        }
        return this.#raw = rawOutput.join('');
    }

    get paper () {
        if (this.#paper) return this.#paper;

        let paperTape = [];
        for (let i = 0; i < 23; i++) {
            if (this.#papertape[i]) paperTape.push(Output.STENORDER[i]);
            else paperTape.push(i === 10 ? '|' : ' ');
        }
        return this.#paper = paperTape.join('');
    }
}

class Input extends Set {
    constructor (keyMap = CONFIG.default.keymap, ...args) {
        super(...args);
        this.keyMap = keyMap;
    }

    add (keyCode) {
        return keyCode in this.keyMap ? super.add(this.keyMap[keyCode]) : null;
    }
}

export class Keyboard {
    #ignoreChord = false;
    onSend = new Set();
    #down = new Set();
    dictionary = {};

    constructor (keyMap = CONFIG.default.keymap) {
        this.input = new Input(keyMap);
    }

    get output () {
        return this.#ignoreChord ? null : new Output(this.input, this.dictionary);
    }

    /**
     * @param {KeyboardEvent} e
     */
    keydown (e) {
        this.#down.add(e.code);
        if (this.#ignoreChord) return;
        if (this.input.add(e.code)) {
            e.preventDefault();
        } else {
            this.#ignoreChord = true;
        }
    }

    /**
     * @param {KeyboardEvent} e
     */
    keyup (e) {
        this.#down.delete(e.code);
        if (!this.#down.size) {
            return this.send();
        }
        return null;
    }

    send () {
        let output = this.output; 
        this.#ignoreChord = false;
        this.input = new Input(this.input.keyMap);

        if (!output) return output;

        for (const func of this.onSend) {
            func(output);
        }

        return output;
    }
}