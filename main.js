import {
    Keys,
} from "./steno-keys.js";

import { StenoDictionary } from "./steno-dictionary.js";
import { StenoPractice } from "./steno-practice.js";

//import { DICT } from "./config/config.js";
import { 
    makeQueryParams,
    parseParams, 
} from "./url-options.js";

const currentURL = window.location.search;
const params = parseParams(currentURL);
if (!('theory' in params)) params.theory = ['plover'];

const keys = new Keys(Keys[params.theory[0]]);

console.log(makeQueryParams({
    theory: ['lapwing'],
    exercise: [...StenoPractice.TOP],
}));

const DICT = new StenoDictionary();
for (const key of Object.keys(StenoDictionary[params.theory[0]])) {
    DICT.fetchDictionary(StenoDictionary[params.theory[0]][key]);
}

// checkmark U+2713 (✓) U+2714 (✔)
function outputBlock (...args) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('output-wrapper');

    for (const arg of args) {
        const pre = document.createElement('pre');
        pre.textContent = arg;
        wrapper.append(pre);
    }

    return wrapper;
}

function paperTapePrint (paperTapeOutput) {
    const prePaper = document.createElement('pre');
    prePaper.textContent = paperTapeOutput;
    const paper = document.querySelector('#paper-tape-entries')
    paper.append(prePaper);
    paper.parentElement.scrollTop = paper.scrollHeight;
}

function practice (items) {
    const practiceDisplay = document.querySelector('#reference-text');
    practiceDisplay.append(StenoPractice.makePracticeText(items));
}

practice(params.exercise);




document.addEventListener('keydown', (e) => {
    keys.keydown(e);
});

document.addEventListener('keyup', (e) => {
    const chord = keys.keyup(e);
    if (!chord) return;

    paperTapePrint(chord.paper);

    const outputBlocks = document.querySelector('#output-wrapper');
    const editor = document.querySelector('#text-editor');
    if (chord.raw === '*') {
        outputBlocks.removeChild(outputBlocks.lastChild);
        editor.removeChild(editor.lastChild);
    } else {
        const output = outputBlock(chord.raw,DICT[chord.raw]);
        outputBlocks.append(output);
        outputBlocks.scrollLeft = outputBlocks.scrollWidth;
        editor.append(` ${chord.raw}`);
        //if (DICT[chord.raw]) editor.append(literalText(DICT[chord.raw]));
    }
});