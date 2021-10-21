const Tesseract = require('tesseract.js');

const exceptions = {
  'p ro b': 'Job 10:22',
  i: 'The Diner',
  'y t': 'Pain Train',
};

async function parseString(image) {
  const worker = Tesseract.createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ&': 0123456789",
  });
  const result = await worker.recognize(image);
  const cleaned = clean(result.data.text);
  if (exceptions[cleaned]) {
    return exceptions[cleaned];
  }
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
  return text.trim().replace('\n', ' - ').replace(/\n/g, '').toLowerCase();
}

function capitalize(text) {
  return text.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}

module.exports = {
  parseString,
  parseStats,
};
