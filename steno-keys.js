const STENOKEYS = ["S","T","K","P","W","H","R","A","O","*","E","U","-F","-R","-P","-B","-L","-G","-T","-S","-D","-Z",];
const STENOLETTERS = ["S","T","K","P","W","H","R","A","O","E","U","-F","-R","-P","-B","-L","-G","-T","-S","-D","-Z",];

const TOPROW = ["T","P","H",'-F','-P','-L','-T','-D',]
const BOTTOMROW = ['S','K','W','R','-R','-B','-G','-S','-Z',];
const VOWELS = ['A','O','E','U'];
const LEFTHAND = ["S","T","K","P","W","H","R","A","O",];
const RIGHTHAND = ["E","U","-F","-R","-P","-B","-L","-G","-T","-S","-D","-Z",];

class Chord {
    static STENORDER = "STKPWHRAO*EUFRPBLGTSDZ";

    #papertape = new Array(22).fill(' ');
    #rawOutput = new Array(22);

    constructor (keys) {
        let separator = '';
        for (const key of keys) {
            this.#papertape[key] = Chord.STENORDER[key];
            this.#rawOutput[key] = Chord.STENORDER[key];
            if (key > 11) separator = '-';
        }
        if ((new Set([7,8,9,10,11])).isDisjointFrom(keys)) {
            this.#rawOutput[9] = separator;
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

    constructor (keyMap = Keys.keyIndexes) {
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
        if (e.code in Keys.keyIndexes && !this.#ignoreChord) {
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