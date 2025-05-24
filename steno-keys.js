class Chord {
    static STENORDER = "STKPWHRAO*EUFRPBLGTSDZ";
    static SEPARATORS = new Set([7,8,9,10,11]);
    #keys;
    #separator = '';

    #papertape = new Array(22).fill(' ');
    #rawOutput = new Array(22);

    constructor (keys) {
        this.#keys = keys;
        this.#papertape[9] = '|';
        let number = false;
        for (const key of keys) {
            if (key === -1) {
                number = true;
                continue;
            }
            this.#papertape[key] = Chord.STENORDER[key];
            this.#rawOutput[key] = Chord.STENORDER[key];
            if (key > 11) this.#separator = '-';
        }

        if (Chord.SEPARATORS.isDisjointFrom(keys)) {
            this.#rawOutput[9] = this.#separator;
        }

        if (number) {
            this.#rawOutput.unshift('#');
        }
    }

    get raw () {
        return this.#rawOutput.join('');
    }

    get paper () {
        return this.#papertape.join('');
    }
}

export class Keys {
    down = new Set();
    chord = new Set();
    #ignoreChord = false;
    #keyMap

    constructor (keyMap = Keys.plover) {
        this.#keyMap = keyMap;
    }

    #setIgnoreChord (bool) {
        this.#ignoreChord = bool;
        this.chord.clear();
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    keydown (e) {
        this.down.add(e.code);
        if (e.code in Keys.plover && !this.#ignoreChord) {
            e.preventDefault();
            this.chord.add(this.#keyMap[e.code]);
        } else this.#setIgnoreChord(true);
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     * @returns 
     */
    keyup (e) {
        this.down.delete(e.code);
        if (!this.down.size) {
            if (this.#ignoreChord) this.#setIgnoreChord(false);
            else return this.send();
        }
    }

    send () {
        let oldChord = new Chord(this.chord);
        this.chord = new Set();
        return oldChord;
    }

    static ploverKeyMap = {
        KeyQ: "S",
        KeyA: "S",
    
        KeyW: "T",
        KeyS: "K",
    
        KeyE: "P",
        KeyD: "W",
    
        KeyR: "H",
        KeyF: "R",
    
        KeyC: "A",
        KeyV: "O",
    
        KeyT: "*",
        KeyY: "*",
        KeyG: "*",
        KeyH: "*",
    
        KeyN: "E",
        KeyM: "U",
    
        KeyU: "-F",
        KeyJ: "-R",
    
        KeyI: "-P",
        KeyK: "-B",
    
        KeyO: "-L",
        KeyL: "-G",
    
        KeyP: "-T",
        Semicolon: "-S",
    
        BracketLeft: "-D",
        Quote: "-Z",
    }
    
    static plover = {
        KeyQ: 0,
        KeyA: 0,
    
        KeyW: 1,
        KeyS: 2,
    
        KeyE: 3,
        KeyD: 4,
    
        KeyR: 5,
        KeyF: 6,
    
        KeyC: 7,
        KeyV: 8,
    
        KeyT: 9,
        KeyY: 9,
        KeyG: 9,
        KeyH: 9,
    
        KeyN: 10,
        KeyM: 11,
    
        KeyU: 12,
        KeyJ: 13,
    
        KeyI: 14,
        KeyK: 15,
    
        KeyO: 16,
        KeyL: 17,
    
        KeyP: 18,
        Semicolon: 19,
    
        BracketLeft: 20,
        Quote: 21,

        Digit1: -1,
        Digit2: -1,
        Digit3: -1,
        Digit4: -1,
        Digit5: -1,
        Digit6: -1,
        Digit7: -1,
        Digit8: -1,
        Digit9: -1,
        Digit0: -1,
        Minus: -1,
        Equal: -1,
    }

    static lapwing = {
        KeyQ: -1,
        KeyA: 0,
    
        KeyW: 1,
        KeyS: 2,
    
        KeyE: 3,
        KeyD: 4,
    
        KeyR: 5,
        KeyF: 6,
    
        KeyC: 7,
        KeyV: 8,
    
        KeyT: 9,
        KeyY: 9,
        KeyG: 9,
        KeyH: 9,
    
        KeyN: 10,
        KeyM: 11,
    
        KeyU: 12,
        KeyJ: 13,
    
        KeyI: 14,
        KeyK: 15,
    
        KeyO: 16,
        KeyL: 17,
    
        KeyP: 18,
        Semicolon: 19,
    
        BracketLeft: 20,
        Quote: 21,
    }
}