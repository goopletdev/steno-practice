export class StenoHistory {
    #fullHistory = [];
    #history = [];
    #text = [];

    // 0 = don't affect next case;
    // 1 = next upper case
    // -1 = next lower case
    #nextCase = 0;

    // 0 = no spaces
    // 1 = leading space
    #nextSpace = 1;

    constructor (stenoDictionary = {}) {
        this.dictionary = stenoDictionary;
    }

    get text () {
        return this.#text;
    }

    handleSpaces (text) {
        if (!this.#nextSpace) return text;
        switch (this.#nextSpace) {
            case 0: return text;
            case 1: return ' ' + text;
        }
    }

    setDefaults (chord, nextCase=0, nextSpace=1) {
        this.#nextCase = nextCase;
        this.#nextSpace = nextSpace;
        chord.nextCase = nextCase;
        chord.nextSpace = nextSpace;
    }

    #setChordType (chord) {
        chord.case = this.#nextCase;
        chord.space = this.#nextSpace;

        let match, translation = chord.translation;
        if (!translation) {
            chord.type = null;
            match = [chord.raw];
            this.setDefaults(chord);
        } else if (match = translation.match(/^(\=undo)$/)) {
            chord.type = 'undo';
            chord.text = null;
            let last = this.#history.pop();
            this.#text.pop();
            this.#nextCase = last.case;
            this.#nextSpace = last.space;
            return;
        } else if (match = translation.match(/^\{(?:(?<attachFront>\^)|(?<function>\=|:))?(?<content>(?:[^\\]|\\[.])+)\}$/s)) {
            chord.type = 'punctuation';
            this.setDefaults(chord,1);
            chord.text = this.handleSpaces()
        } else if (match = translation.match(/^.+$/s)) {
            chord.type = 'string';
            this.setDefaults(chord);
        }

        chord.text = this.handleSpaces(match[0]);
        this.#text.push(chord.text);
        this.#history.push(chord);
    }

    add (chord) {
        chord.case = this.#nextCase;
        chord.space = this.#nextSpace;

        this.#setChordType(chord);
        this.#fullHistory.push(chord);
    }

    clear () {
        this.#fullHistory = [];
        this.#history = [];
        this.#text = [];
        this.#nextCase = 0;
        this.#nextSpace = 1;
    }
}