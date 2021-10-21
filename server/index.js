const path = require('path');
const { takeScreenshot, extractSections } = require('./lib/screenshot');
const { GlobalKeyboardListener } = require('node-global-key-listener');
const { parseStats, parseString } = require('./lib/ocr');
const { startWebServer, showEntry } = require('./lib/webserver');
const { addEntry } = require('./lib/database');
const { addOnlineEntry } = require('./lib/api');

const player = require('node-wav-player');
const { getId } = require('./lib/getId');

startWebServer();

const hotkeys = new GlobalKeyboardListener();
hotkeys.addListener(({ name, state }) => {
  if (name === 'F8' && state === 'DOWN') {
    console.log('F8 pressed');
    addStats();
    player
      .play({
        path: path.resolve('assets/ping.wav'),
      })
      .catch(console.error);
  }
});

const id = getId();

async function addStats() {
  try {
    const wholeScreen = await takeScreenshot();
    const sections = await extractSections(wholeScreen);
    const act = await parseString(sections.act);
    const chapter = await parseString(sections.chapter);
    const { riddenKills, mutationKills } = await parseStats(sections.stats);
    console.log('Read the following data:');
    console.log(`Act: ${act}`);
    console.log(`Chapter: ${chapter}`);
    console.log(`Ridden Kills: ${riddenKills}`);
    console.log(`Mutation Kills: ${mutationKills}`);
    const entry = { act, chapter, riddenKills, mutationKills };
    // addEntry(entry);
    // showEntry(entry);
    await addOnlineEntry(entry);
  } catch (error) {
    console.error('Failed to parse screenshot');
    console.error(error);
  }
}
