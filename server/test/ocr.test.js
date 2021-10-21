const fs = require('fs');
const path = require('path');
const { getFileName } = require('./util');
const { extractSections } = require('../lib/screenshot');

const { parseString, parseStats } = require('../lib/ocr.js');

jest.setTimeout(120 * 1000);

test('parse act, chapter and kill', async () => {
  const expectedResults = [
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
    {
      act: 'Job 10:22',
      chapter: 'Grave Danger',
      riddenKills: 217,
      mutationKills: 26,
    },
    {
      act: 'Search & Rescue',
      chapter: 'Bar Roomblitz',
      riddenKills: 462,
      mutationKills: 39,
    },
    {
      act: 'Search & Rescue',
      chapter: 'Book Worms',
      riddenKills: 401,
      mutationKills: 35,
    },
    {
      act: 'The Dark Before The Dawn',
      chapter: 'Special Delivery',
      riddenKills: 73,
      mutationKills: 3,
    },
    {
      act: 'The Dark Before The Dawn',
      chapter: 'The Diner',
      riddenKills: 200,
      mutationKills: 6,
    },
    {
      act: "The Devil's Return",
      chapter: 'Pain Train',
      riddenKills: 240,
      mutationKills: 21,
    },
    {
      act: "The Devil's Return",
      chapter: 'Resurgence',
      riddenKills: 112,
      mutationKills: 5,
    },
    {
      act: "The Devil's Return",
      chapter: 'Tunnel Of Blood',
      riddenKills: 155,
      mutationKills: 13,
    },
  ];
  for (const expectedResult of expectedResults) {
    const fileName = getFileName(expectedResult);
    const img = fs.readFileSync(path.resolve('test/testImages', fileName));
    const extractedSections = await extractSections(img);
    const act = await parseString(extractedSections.act);
    const chapter = await parseString(extractedSections.chapter);
    const stats = await parseStats(extractedSections.stats);
    fs.writeFileSync(`./act.png`, extractedSections.act);
    expect(act).toEqual(expectedResult.act);
    expect(chapter).toEqual(expectedResult.chapter);
    expect(stats.riddenKills).toEqual(expectedResult.riddenKills);
    expect(stats.mutationKills).toEqual(expectedResult.mutationKills);
  }
});
