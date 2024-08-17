// this file needs to know the current language to be able to export words for the right language

// currently only have a small subset of 10 vocab per language

const fileContentES = `
fregar	to scrub
barrer	to sweep
acogedor	welcoming
el timbre	doorbell
lamer	to lick
desafiante	challenging
al alcance de	within reach
barajar	to shuffle
el mazo	deck
robar	to draw, take
`.trim();

const fileContentDE = `
heiraten	to marry 
aufregend	exciting
freut mich	nice to meet you
unten	downstairs
das Riesenrad	ferris wheel
bestehen	to pass
zeichnen	to draw
der Mut	courage
hübsch	pretty
ausverkauft	sold out
`.trim();

const fileContentFR = `
la coupure	cut
éternuer	to sneeze
la pousette	stroller
la lessive	detergent 
ronfler	to snore
le poignet	wrist
l'appareil électroménager	household appliance
le bricolage	DIY
faire du stop	to hitchhike
soûl	drunk
`.trim();

const fileContentIT = `
legare	to tie
il dado	nut (for bolt)
il rencio	rag
cacciare	to hunt
la zecca	tick
godere di	to enjoy
la lama	blade
dritto	straight
la rupe	cliff
il petto	chest (thorax)
`.trim();

const fileContentPT = `
pálido	pale
puxar	to pull 
esquecido	forgotten
o ensaio	try
preguiçoso	lazy
o jeito	way, manner
o coelho	rabbit
mergulhar	to dive
engolir	to swallow
a enxaqueca	migraine
`.trim();

const fileContentKO = `
지갑	Wallet
자전거	Bicycle 
타다	To ride 
내다	To pay
번개	Lightning 
사다리	Ladder
단	Sweet
천둥	Thunder
소풍	Picnic
목	Tree
`.trim();

export const vocabularyDataES = fileContentES.split('\n').map((line, index) => {
  const [original, english] = line.split('\t');
  return { id: index, original, english, seen: false };
});

export const vocabularyDataDE = fileContentDE.split('\n').map((line, index) => {
    const [original, english] = line.split('\t');
    return { id: index, original, english, seen: false };
});

export const vocabularyDataFR = fileContentFR.split('\n').map((line, index) => {
    const [original, english] = line.split('\t');
    return { id: index, original, english, seen: false };
});

export const vocabularyDataIT = fileContentIT.split('\n').map((line, index) => {
    const [original, english] = line.split('\t');
    return { id: index, original, english, seen: false };
});

export const vocabularyDataPT = fileContentPT.split('\n').map((line, index) => {
    const [original, english] = line.split('\t');
    return { id: index, original, english, seen: false };
});

export const vocabularyDataKO = fileContentKO.split('\n').map((line, index) => {
    const [original, english] = line.split('\t');
    return { id: index, original, english, seen: false };
});
