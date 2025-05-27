// document.querySelector('div[is=paper-tape]');

export class PaperTape extends HTMLDivElement {
    title = document.createElement('pre');
    tape = document.createElement('div');
    entries = document.createElement('div');

    constructor (stenorder = 'STKPWHRAO*EUFRPBLGTSDZ') {
        super();
        this.title.style.margin = '0';
        this.title.style.padding = '0';
        this.style.fontFamily = 'monospace';
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
        this.style.width = 'fit-content';

        this.classList.add('inverted');

        this.entries.style.display = 'flex';
        this.entries.style.flexDirection = 'column';

        this.title.textContent = stenorder;
        this.title.classList.add('standard');
        this.title.style.userSelect = 'none';
        this.tape.append(this.entries);
        this.tape.style.overflow = 'scroll';
        this.tape.style.scrollbarWidth = 'none';
        this.append(this.title,this.tape);
    }

    log (chord) {
        const entry = document.createElement('pre');
        entry.textContent = chord;
        entry.style.padding = '0';
        entry.style.margin = '0';
        this.entries.append(entry);
        this.tape.scrollTop = this.tape.scrollHeight;
    }
}

customElements.define('paper-tape', PaperTape, { extends: 'div' });
