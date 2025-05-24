import {
    Keys,
} from "./steno-keys.js";

import { StenoDictionary } from "./steno-dictionary.js";

//import { DICT } from "./config/config.js";

const DICT = new StenoDictionary();

const keys = new Keys();

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
    const paper = document.querySelector('#paper-tape-tape')
    paper.append(prePaper);
    paper.parentElement.scrollTop = paper.scrollHeight;
}




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