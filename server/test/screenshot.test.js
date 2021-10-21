const fs = require('fs');
const path = require('path');
const { getFileName } = require('./util');
const { extractSections } = require('../lib/screenshot');

test('parse title image', async () => {
  const expectedResults = [
    {
      act: "THE DEVIL'S RETURN",
      chapter: 'RESURGENCE',
      riddenKills: 112,
      mutationKills: 5,
    },
  ];
  for (const expectedResult of expectedResults) {
    const fileName = getFileName(expectedResult);
    const img = fs.readFileSync(path.resolve('test/testImages', fileName));
    const extractedSections = await extractSections(img);

    expect(extractedSections.act).toBeInstanceOf(Buffer);
    expect(extractedSections.chapter).toBeInstanceOf(Buffer);
    expect(extractedSections.stats).toBeInstanceOf(Buffer);
  }
});
