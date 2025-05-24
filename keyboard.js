function makeKey(name,width=1,height=1) {
    const key = document.createElement('div');
    key.classList.add('steno-key');
    key.style.aspectRatio = `${width} / ${height}`;
    key.textContent = name;
    key.id = `steno-key-${name}`
    return key;
}

/**
 * 
 * @param {'row'|'column'} direction 
 * @param  {...string} names 
 */
function keyGroup(direction, ...names) {
    const group = document.createElement('div');
    group.style.display = 'flex';
    group.style.flexDirection = direction;
    group.classList.add('key-group');
    group.append(...names.map(n => makeKey(n)));
    return group;
}

const S = makeKey('S',1,2);
const TK = keyGroup('column', 'T', 'K');
const PW = keyGroup('column', 'P', 'W');
const HR = keyGroup('column', 'H', 'R');
const del = makeKey('*',1,2);
const FR = keyGroup('column', '-F', '-R');
const PB = keyGroup('column', '-P','-B');
const LG = keyGroup('column', '-L', '-G');
const TS = keyGroup('column', '-T', '-S');
const DZ = keyGroup('column', '-D', '-Z');
const AO = keyGroup('row', 'A', 'O');
const EU = keyGroup('row', 'E', 'U');

const consonants = document.createElement('div');
consonants.append(S,TK,PW,HR,del,FR,PB,LG,TS,DZ);
consonants.style.display = 'flex';
consonants.style.flexDirection = 'row';
consonants.style.width = 'fit-contents';

const vowels = document.createElement('div');
vowels.append(AO,EU);
vowels.style.display = 'flex';
vowels.style.flexDirection = 'row';
vowels.style.width = 'fit-contents';

const keyboard = document.createElement('div');
keyboard.append(consonants,vowels);
keyboard.style.display = 'flex';
keyboard.style.flexDirection = 'row';


document.body.append(keyboard);