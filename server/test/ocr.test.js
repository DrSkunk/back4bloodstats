const fs = require('fs');
const path = require('path');
const { getFileName } = require('./util');
const { extractSections } = require('../lib/screenshot');

const { parseString, parseStats } = require('../lib/ocr.js');

jest.setTimeout(90 * 1000);

test('parse act, chapter and kill', async () => {
  const expectedResults = [
    {
      act: "The Devil's Return",
      chapter: 'Resurgence',
      riddenKills: 112,
      mutationKills: 5,
    },
    {
      act: 'Blue Dog Hollow',
      chapter: 'Abandoned',
      riddenKills: 610,
      mutationKills: 51,
    },
    {
      act: 'Blue Dog Hollow',
      chapter: 'The Sound Of Thunder',
      riddenKills: 689,
      mutationKills: 53,
    },
  ];
  for (const expectedResult of expectedResults) {
    const fileName = getFileName(expectedResult);
    const img = fs.readFileSync(path.resolve('test/testImages', fileName));
    const extractedSections = await extractSections(img);
    const act = await parseString(extractedSections.act);
    const chapter = await parseString(extractedSections.chapter);
    const stats = await parseStats(extractedSections.stats);
    // fs.writeFileSync(`./temp/${fileName}.png`, extractedSections.act);
    expect(act).toEqual(expectedResult.act);
    expect(chapter).toEqual(expectedResult.chapter);
    expect(stats.riddenKills).toEqual(expectedResult.riddenKills);
    expect(stats.mutationKills).toEqual(expectedResult.mutationKills);
  }
});
