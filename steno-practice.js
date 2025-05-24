export class StenoPractice {
    static makePracticeArray (practiceItems=StenoPractice.LETTERS, length=100, randomize=true) {
        const practiceArray = [];
        for (let i=0; i < length; i++) {
            if (randomize) {
                const randomInt = Math.floor(Math.random() * practiceItems.length);
                practiceArray.push(practiceItems[randomInt]);
            } else {
                let index = i; 
                while (i > practiceItems.length) {
                    index -= practiceItems.length;
                }
                practiceArray.push(practiceItems[index]);
            }
        }
        return practiceArray;
    }

    static makePracticeText (practiceItems=StenoPractice.LETTERS, length=100, randomize=true) {
        return StenoPractice.makePracticeArray(...arguments).join(' ');
    }

    static join (...practiceLists) {

    }

    /**
     * 
     * @param  {...Array} practiceLists 
     * @returns 
     */
    static same (...practiceLists) {
        return practiceLists[0].filter(v => {
            for (const list of practiceLists.slice(1))  {
                if (!list.includes(v)) return false;
            }
            return true;
        });
    }

    static ALL = ["S","T","K","P","W","H","R","A","O","*","E","U","-F","-R","-P","-B","-L","-G","-T","-S","-D","-Z",];
    static LETTERS = ["S","T","K","P","W","H","R","A","O","E","U","-F","-R","-P","-B","-L","-G","-T","-S","-D","-Z",];

    static CONSONANTS = ["S","T","K","P","W","H","R","-F","-R","-P","-B","-L","-G","-T","-S","-D","-Z",];

    static TOP = ["T","P","H",'-F','-P','-L','-T','-D',]
    static BOTTOM = ['S','K','W','R','-R','-B','-G','-S','-Z',];
    static VOWELS = ['A','O','E','U'];
    static LEFT = ["S","T","K","P","W","H","R","A","O",];
    static RIGHT = ["E","U","-F","-R","-P","-B","-L","-G","-T","-S","-D","-Z",];
}