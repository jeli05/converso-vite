const fileContent = `
fregar	to scrub
barrer	to sweep
acogedor	welcoming
el timbre	doorbell
lamer	to lick
desafiante	challenging
al alcance de	within reach
barajar	to shuffle
`.trim();

const vocabularyData = fileContent.split('\n').map((line, index) => {
  const [spanish, english] = line.split('\t');
  return { id: index, spanish, english, seen: false };
});

console.log("VOCAB FILE LEN:", vocabularyData.length)

export default vocabularyData;
