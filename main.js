import {
    Keys,
    Chord,
} from "./steno-keys.js";

import { DICT } from "./config/config.js";

const keys = new Keys();
keys.raw = 'quantum';

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

function deleteLastChord (outputElements) {
    return outputElements.removeChild(outputElements.lastChild).lastChild.textContent;
}

function literalText (translation) {
    if (!translation) return;
    let exec;
    if (exec = /\{(.*)\}/s.exec(translation)) {
        if (/^\^[^\^]*$/.test(exec[1])) return exec[1].slice(1);
        return exec[1];
    } else {
        return ' ' + translation;
    }
}




document.addEventListener('keydown', (e) => {
    keys.keydown(e);
});

document.addEventListener('keyup', (e) => {
    const chord = keys.keyup(e);
    if (!chord) return;

    const prePaper = document.createElement('pre');
    prePaper.textContent = chord[0];
    const paper = document.querySelector('#paper-tape-tape')
    paper.append(prePaper);
    paper.parentElement.scrollTop = paper.scrollHeight;

    const outputBlocks = document.querySelector('#output-wrapper');
    const editor = document.querySelector('#text-editor');
    if (chord[1] === '*') {
        let text = literalText(deleteLastChord(outputBlocks));
        //if (text) editor.removeChild(editor.lastChild);
        editor.removeChild(editor.lastChild);
    } else {
        const output = outputBlock(chord[1],DICT[chord[1]]);
        outputBlocks.append(output);
        outputBlocks.scrollLeft = outputBlocks.scrollWidth;
        editor.append(` ${chord[1]}`);
        //if (DICT[chord[1]]) editor.append(literalText(DICT[chord[1]]));
    }
});