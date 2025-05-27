// initializes document.searchParams w/ url options
import '../../query-params/parse-raw.js'; 
import { CONFIG } from '../../theory-config/config.js';

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