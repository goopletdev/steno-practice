// initializes document.searchParams w/ url options
import '../../query-params/parse-raw.js'; 
import { CONFIG } from '../../theory-config/config.js';
import { StenoDictionary } from '../../steno-dictionary/steno-dict.js';
import { Keyboard } from '../../steno-keyboard/steno-keyboard.js';

const DICT = new StenoDictionary();
DICT.fetchDicts(CONFIG.lapwing.dictionaries);

const tape = document.querySelector('div[is=paper-tape]');
const keys = new Keyboard(DICT);
keys.onSend.add(chord => tape.log(chord.paper));

document.addEventListener('keydown', e => keys.keydown(e));
document.addEventListener('keyup', e => keys.keyup(e));