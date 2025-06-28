// initializes document.searchParams w/ url options
import '../query-params/parse-raw.js'; 
import { CONFIG } from '../theory-config/config.js';
import { StenoDictionary } from '../steno-dictionary/steno-dict.js';
import { Keyboard } from '../steno-keyboard/steno-keyboard.js';
import * as PRAC from '../practice/get-practice-files.js';

const DICT = new StenoDictionary();
DICT.fetchDicts(...CONFIG.lapwing.dictionaries);

const tape = document.querySelector('div[is=paper-tape]');

const sequence = document.querySelector('div[is=practice-sequence]');
sequence.setSequence(...PRAC.customSequence(45,3,...await PRAC.chapterTest(6)));

const keys = new Keyboard(CONFIG.lapwing.keymap);
keys.dictionary = DICT;
keys.onSend.add(chord => tape.log(chord.paper));
keys.onSend.add(chord => sequence.tryInput(chord));

document.addEventListener('keydown', e => keys.keydown(e));
document.addEventListener('keyup', e => keys.keyup(e));