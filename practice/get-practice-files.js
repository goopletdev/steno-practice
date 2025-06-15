const chapterExercises = [,,,,,
    [   // ch5: basics
        // single syllable words
        `https://lapwing.aerick.ca/practice/5-cvc.txt`,
        `https://lapwing.aerick.ca/practice/5-basic-left-hand.txt`,
        //dbl:
        `https://lapwing.aerick.ca/practice/5-dbl.txt`,
        // chapter 5 test:
        `https://lapwing.aerick.ca/practice/5-test.txt`,
    ],
    [   //ch6 left hand consonants cont'd
        //fqm
        `https://lapwing.aerick.ca/practice/6-fqm.txt`,
        //gny
        `https://lapwing.aerick.ca/practice/6-gny.txt`,
        //zvj
        `https://lapwing.aerick.ca/practice/6-zvj.txt`,
        //ch6 test
        `https://lapwing.aerick.ca/practice/6-test.txt`,
    ],
    [   //ch7: vowels
        //oe,ou,oeu
        `https://lapwing.aerick.ca/practice/7-OE-OU-OEU.txt`,
        //aeu
        `https://lapwing.aerick.ca/practice/7-AEU.txt`,
        //aou
        `https://lapwing.aerick.ca/practice/7-AOU.txt`,
        //ch7 test
        `https://lapwing.aerick.ca/practice/7-test.txt`,
    ],
    [   //ch8: vowels cont'd
        //aoe
        `https://lapwing.aerick.ca/practice/8-AOE.txt`,
        //aoeu
        `https://lapwing.aerick.ca/practice/8-AOEU.txt`,
        //au
        `https://lapwing.aerick.ca/practice/8-AU.txt`,
        //ae
        `https://lapwing.aerick.ca/practice/8-AE.txt`,
        //ae,aeu,aoe
        `https://lapwing.aerick.ca/practice/8-AE-AEU-AOE.txt`,
        //ao
        `https://lapwing.aerick.ca/practice/8-AO.txt`,
        //ch8 test
        `https://lapwing.aerick.ca/practice/8-test.txt`,
    ],
    [   //ch9: right hand chords
        //-v
        `https://lapwing.aerick.ca/practice/9-right-v.txt`,
        //-m,-k
        `https://lapwing.aerick.ca/practice/9-right-m-and-k.txt`,
        //-mp,-th,-lk
        `https://lapwing.aerick.ca/practice/9-right-mp-th-lk.txt`,
        //ch9 test
        `https://lapwing.aerick.ca/practice/9-test.txt`,
    ],
];

const chapterBriefs = [,,,,,
    // chapter 5 briefs
`are	R or -R
did	TK
do	TKO
I	EU
is	S
so	SO
the	-T
you	U
.	TP-PL
?	KW-PL
did you	TKU
do you	TKOU
is the	S-T
so the	SOT
are the	R-T
are you	RU`,
//chapter 6 briefs
`again	TKPWEPB
and	SKP
ask	SK
before	PW-FR
have	SR
it	T
no	TPHO
said	SED
very	SRE
and you	SKPU
and I	SKPEU
and the	SKP-T
have you	SRU
is it	ST
it is	T-S`,
//chapter 7 briefs
`a	AEU
can	K
for	TP-R
in	TPH
if	TP
new	TPHU
to	TO
two	TWO
,	KW-BG
!	TP-BG
for the	TP-RT
can you	KU
in the	TPH-T
if the	TP-T
to the	TOT`,
//chapter 8 briefs, omitting R-R and KPA*
`had	H
people	P
this	TH
there	THR
when	WH
why	KWH
will	HR
with	W
had the	H-T
this is	TH-S
there is	THR-S
there’s	THR*S
there are	THR-R
there’re	THR*R
when is	WH-S
when’s	WH*S
when are	WH-R
why is	KWH-S
why’s	KWH*S
why are	KWH-R
will the	HR-T
will you	HRU`,

];

export function parsePracticeFiles (text) {
    return text.split('\n').filter(x => x !== '').map(line => line.split('\t'));

}

export async function fetchPracticeFile (url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
  
        const text = await response.text();
        return parsePracticeFiles(text);
    } catch (error) {
        console.error(error.message);
    }
}

export async function chapterTest (chapterNumber) {
    const chapter = chapterExercises[chapterNumber];
    const test = chapter[chapter.length-1];
    console.log(test);
    const sequence = await fetchPracticeFile(test);
    console.log(sequence);
    return sequence;
}

export function parseChapterBriefs (chapterNumber) {
    const briefs = chapterBriefs[chapterNumber];
    if (!briefs) throw new Error (`no briefs for chapter ${chapterNumber}`);
    return parsePracticeFiles(briefs);
}

export function customSequence (maxWords, repetitions, ...wordList) {
    const totalWords = maxWords * repetitions;
    for (let i = wordList.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [wordList[i],wordList[j]] = [wordList[j],wordList[i]];
    }

    const shuffled = wordList.slice(0,maxWords);

    const sequence = [];
    for (let i=0; i < totalWords; i++) {
        sequence.push([...shuffled[i%shuffled.length]]);
    }
    return sequence;
}