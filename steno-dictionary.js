export class StenoDictionary {
    constructor (...args) {
        this.add(...args);
    }

    add (...args) {
        Object.assign(this, ...args);
    }

    async fetchDictionary (url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
      
            const json = await response.json();
            console.log(json);
            this.add(json);
        } catch (error) {
            console.error(error.message);
        }
    }

    static plover = {
        commands: "https://raw.githubusercontent.com/openstenoproject/plover/refs/heads/main/plover/assets/commands.json",
        main: "https://raw.githubusercontent.com/openstenoproject/plover/refs/heads/main/plover/assets/main.json",
        user: "https://raw.githubusercontent.com/openstenoproject/plover/refs/heads/main/plover/assets/user.json",
    }

    static lapwing = {
        lapwingCommands: "https://raw.githubusercontent.com/aerickt/steno-dictionaries/main/lapwing-commands.json",
        lapwingNumbers: "https://raw.githubusercontent.com/aerickt/steno-dictionaries/main/lapwing-numbers.json",
        lapwingUkAdditions: "https://raw.githubusercontent.com/aerickt/steno-dictionaries/main/lapwing-uk-additions.json",
        lapwingProperNouns: "https://raw.githubusercontent.com/aerickt/steno-dictionaries/main/lapwing-proper-nouns.json",
        lapwingBase: "https://raw.githubusercontent.com/aerickt/steno-dictionaries/main/lapwing-base.json",
    }

    static test = {
        "S-":"is",
        "T":"it",
        "H":"had",
        "U":"you",
        "-F":"of",
        "-T":"the",
        "TP-PL":"{.}",
        "H-F":"{?}",
        "STPH-FPLT":"{:}", 	
    }
} 