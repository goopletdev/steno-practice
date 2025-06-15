import { StenoHistory } from "../steno-dictionary/steno-history.js";

export class PracticeSequence extends HTMLDivElement {
    #sequenceElements = [];
    #sequence = document.createElement('div');
    #inputBlock = document.createElement('div');
    input = document.createElement('pre').appendChild(document.createElement('div'));
    #hint = document.createElement('pre').appendChild(document.createElement('div'));
    #history = new StenoHistory();
    #charlength;
    #timestamps = [];
    #mistakeCount = 0;

    constructor () {
        super();
        this.#inputBlock.append(this.input,this.#hint);
        this.append(this.#sequence,this.#inputBlock);
        this.input.style.overflowWrap = 'anywhere';
        this.#sequence.style.display = 'flex';
        this.#sequence.style.flexDirection = 'row';
        this.#sequence.style.overflow = 'scroll';
    }

    setSequence (...prompts) {
        this.#sequence.childNodes.forEach(node => node.remove());
        for (const [prompt,hint] of prompts) {
            const pre = document.createElement('pre');
            pre.style.marginLeft = '1em';
            pre.textContent = prompt;
            pre.dataHint = hint;
            this.#sequenceElements.push(pre);
        }
        this.#sequence.append(...this.#sequenceElements);
        this.#sequence.firstChild.classList.add('challenge-target');
        this.#charlength = this.#sequence.textContent.length;
    }

    /**
     * 
     * @param {Array<string>} text 
     */
    tryInput (chord) {
        this.#history.add(chord);

        while (this.input.childNodes.length > this.#history.text.length) {
            this.input.lastChild.remove();
        }
        for (let i = 0; i < this.#history.text.length; i++) {
            if (this.input.childNodes[i] === undefined) this.input.append(this.#history.text[i]);
            else if (this.#history.text[i] !== this.input.childNodes[i].textContent) {
                this.input.childNodes[i].textContent = this.#history.text[i];
            }
        }
        if (this.input.textContent.trim() === this.#sequence.firstChild.textContent) {
            this.#hint.childNodes.forEach(node => node.remove());
            this.#timestamps.push(Date.now());
            this.input.textContent = '';
            this.#sequence.firstChild.remove();
            this.#history.clear();
            if (this.#sequence.firstChild) {
                this.#sequence.firstChild?.classList.add('challenge-target');
            } else this.finish();
        } else {
            if (this.#sequence.firstChild.MISTAKE) return;
            this.#sequence.firstChild.MISTAKE = true;
            this.#mistakeCount++;
            this.#hint.textContent = this.#sequence.firstChild.dataHint;
        }
    }

    finish () {
        const words = this.#charlength / 5;
        const mins = (this.#timestamps[this.#timestamps.length-1] - this.#timestamps[0]) / 60000;
        console.log('WPM:',words/mins);
        for (const node of this.childNodes) {
            node.remove();
        }
        const result = document.createElement('div');
        const len = this.#sequenceElements.length;
        const mistakes = this.#mistakeCount;
        result.append(`WPM: ${(words/mins).toFixed(2)}\nAccuracy: ${(100*(len-mistakes)/len).toFixed(2)}%`);
        this.append(result);
    }
}

customElements.define('practice-sequence', PracticeSequence, { extends: 'div' });