export class Chord {
    static STENORDER = "STKPWHRAO*EUFRPBLGTSDZ";
    static STENOKEYS = ["S","T","K","P","W","H","R","A","O","*","E","U","-F","-R","-P","-B","-L","-G","-T","-S","-D","-Z",];
    static TOPROW = ["T","P","H",'-F','-P','-L','-T','-D',]
    static BOTTOMROW = ['S','K','W','R','-R','-B','-G','-S','-Z',];
    static VOWELS = ['A','O','E','U'];
    static LEFTHAND = ["S","T","K","P","W","H","R","A","O",];
    static RIGHTHAND = ["E","U","-F","-R","-P","-B","-L","-G","-T","-S","-D","-Z",];

    keys = new Array(22).fill(false);
    constructor () {};

    tape (raw = true) {
        return raw ? this.raw() : this.paper();
    }

    clear (raw = true) {
        const tape = this.tape(raw);
        this.keys.fill(false);
        return tape;
    }

    add (k) {
        const key = Chord.STENOKEYS.indexOf(k)
        if (key > -1) return this.keys[key] = true;
        return false;
    }

    raw () {
        const output = [];
        let separator = '-';

        for (let i = 0; i < 12; i++) {
            if (this.keys[i]) {
                output.push(Chord.STENORDER[i]);
                if (i >= 7) separator = '';
            }
        }

        if (separator && this.keys.slice(12).reduce((prev,curr) => prev + curr)) {
            output.push(separator);
        }

        for (let i = 12; i < Chord.STENORDER.length; i++) {
            if (this.keys[i]) output.push(Chord.STENORDER[i]);
        }

        return output.join('');
    }

    paper () {
        return this.keys.map((k, i) => k ? Chord.STENORDER[i] : " ").join('');
    }
}

export class Keys {
    down = new Set();
    chord = new Chord();
    #ignoreChord = false;
    raw = true;

    constructor () {}

    get ignoreChord () {
        return this.#ignoreChord;
    }

    set ignoreChord (bool) {
        this.#ignoreChord = bool;
        this.chord.clear();
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    keydown (e) {
        this.down.add(e.code);
        if (e.code in Keys.keyMap && !this.ignoreChord) {
            e.preventDefault();
            this.chord.add(Keys.keyMap[e.code]);
        } else this.ignoreChord = true;
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     * @returns 
     */
    keyup (e) {
        this.down.delete(e.code);
        if (!this.down.size) {
            if (this.ignoreChord) this.ignoreChord = false;
            else return this.send();
        }
    }

    send () {
        if (typeof this.raw === 'boolean') return this.chord.clear(this.raw);
        return [this.chord.paper(), this.chord.clear()];
    }

    static keyMap = {
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
    
    static keyIndexes = {
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
    }
}