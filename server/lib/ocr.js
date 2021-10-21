const Tesseract = require('tesseract.js');

async function parseString(image) {
  const result = await Tesseract.recognize(image);
  console.log(result.data.text);
  return capitalize(clean(result.data.text));
}

async function parseStats(image) {
  const result = await Tesseract.recognize(image);
  if (result.data.lines.length < 2) {
    throw new Error('Not enough lines in stats section');
  }
  const stats = result.data.lines.reduce(
    (acc, line) => {
      if (line.text.toLowerCase().includes('ridden')) {
        acc.riddenKills = parseInt(line.text.match(/\d+/)[0], 10);
      } else if (line.text.toLowerCase().includes('mutations')) {
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
  return stats;
}

function clean(text) {
  return text.trim().replace('\n', ' - ').replace(/\n/g, '');
}

function capitalize(text) {
  return text.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}

module.exports = {
  parseString,
  parseStats,
};
