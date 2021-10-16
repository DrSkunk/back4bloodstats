const Tesseract = require('tesseract.js');

async function parseTitle(image) {
  console.log('Parsing title section...');
  const result = await Tesseract.recognize(image);
  return result.data.text.replace('\n', ' - ').replace(/\n/g, '');
}

async function parseStats(image) {
  console.log('Parsing stats section...');
  const result = await Tesseract.recognize(image);
  if (result.data.lines.length < 2) {
    throw new Error('Not enough lines in stats section');
  }
  const stats = result.data.lines.reduce(
    (acc, line) => {
      if (line.text.toLowerCase().includes('ridden')) {
        console.log('ridden', line.text);
        acc.riddenKills = parseInt(line.text.match(/\d+/)[0], 10);
      } else if (line.text.toLowerCase().includes('mutations')) {
        console.log('mutations', line.text);
        acc.mutationKills = parseInt(line.text.match(/\d+/)[0], 10);
      }
      return acc;
    },
    { mutationKills: undefined, riddenKills: undefined }
  );
  if (stats.riddenKills === undefined) {
    throw new Error('Could not find ridden kills');
  }
  if (stats.mutationKills === undefined) {
    throw new Error('Could not find mutation kills');
  }
  console.log(`Ridden Kills: ${stats.riddenKills}`);
  console.log(`Mutation Kills: ${stats.mutationKills}`);
  return stats;
}

module.exports = {
  parseTitle,
  parseStats,
};
