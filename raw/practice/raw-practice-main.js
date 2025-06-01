// initializes document.searchParams w/ url options
import '../../query-params/parse-raw.js'; 
import { CONFIG } from '../../theory-config/config.js';
import { StenoDictionary } from '../../steno-dictionary/steno-dict.js';
import { Keyboard } from '../../steno-keyboard/steno-keyboard.js';

const DICT = new StenoDictionary();
DICT.fetchDicts(CONFIG.plover.dictionaries);

const keys = new Keyboard(DICT);

const tape = document.querySelector('div[is=paper-tape]');

function practiceBlock (practiceText) {
    const block = document.createElement('div');
    block.style.display = 'flex';
    block.style.flexDirection = 'column';
    block.style.width = 'fit-content';
    const text = document.createElement('pre');
    text.textContent = practiceText;
    block.append(text);
}

document.addEventListener('keydown', e => keys.keydown(e));
document.addEventListener('keyup', e => {
    const chord = keys.keyup(e);
    if (!chord) return;

    tape.log(chord.paper);
})