import { CONFIG } from "../theory-config/config.js";

class Output {
    static STENORDER = "#STKPWHRAO*EUFRPBLGTSDZ";

    #papertape = new Array(23);
    separator = true;

    constructor (keys) {
        for (const key of keys) {
            this.#papertape[key] = Output.STENORDER[key];
            if (key >= 8 && key <= 12) this.separator = false;
        }
    }

    get raw () {
        let rawOutput = [];
        this.#papertape.forEach((char, i) => {
            if (char) rawOutput.push(char);
            else if (i === 12 && this.separator) rawOutput.push('-');
        });
    }

    get paper () {
        return this.#papertape.map((char, i) => {
            if (char) return char;
            if (i === 10) return '|';
            return ' ';
        }).join('');
    }
}

class Input extends Set () {
    constructor (keyMap = CONFIG.default.keymap, ...args) {
        super(...args);
        this.keyMap = keyMap;
    }

    add (keyCode) {
        if (!(keyCode in this.keyMap)) return null;
        return super.add(keyCode);
    }
}

export class Keyboard {
    #ignoreChord = false;
    onSend = new Set();
    #down = new Set();

    constructor (keyMap = CONFIG.default.keymap) {
        this.input = new Input(keyMap);
    }

    get output () {
        return this.#ignoreChord ? null : new Output(this.input);
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

        for (const func of this.onSend) {
            func(output);
        }

        return output;
    }
}