function practiceBlock (targetText, hint) {
    const block = document.createElement('div');
    block.style.width = 'fit-content';
    const text = document.createElement('pre');
    text.textContent = targetText;
    block.append(text);
    return block;
}

const inputBlock = document.createElement('div');
const userInputBlock = document.createElement('pre');
const hintBlock = document.createElement('pre');
inputBlock.append(userInputBlock,hintBlock);

class PracticeSequence extends HTMLDivElement {
    #sequence = document.createElement('div');
    #inputBlock = document.createElement('div');
    #input = document.createElement('div').appendChild('pre');
    #hint = document.createElement('div').appendChild('pre');

    constructor () {
        this.#inputBlock.append(this.#input,this.#hint);
        this.append(this.#sequence,this.#inputBlock);
    }

    add (...prompts) {
        for (const [prompt,hint] of prompts) {
            const pre = document.createElement('pre');
            pre.textContent = prompt;
            pre.dataHint = hint;
            this.#sequence.push(pre);
        }
    }

    get input () {
        return this.#input.innerText;
    }

    set input (text) {
        this.#input.innerText = text;
        if (this.input === )
    }
}