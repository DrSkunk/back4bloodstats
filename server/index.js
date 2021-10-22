const path = require('path');
const player = require('node-wav-player');
const { GlobalKeyboardListener } = require('node-global-key-listener');
const { takeScreenshot, extractSections } = require('./lib/screenshot');
const { parseStats, parseString } = require('./lib/ocr');
const { addOnlineEntry } = require('./lib/api');
const { getConfig } = require('./lib/getConfig');
// const { startWebServer, showEntry } = require('./lib/webserver');

// startWebServer();

async function init() {
  console.log('Starting Back4Blood stats analyzer');
  const config = await getConfig();
  console.log(`Using username ${config.userName} and ID ${config.userId}`);

  const hotkeys = new GlobalKeyboardListener();
  hotkeys.addListener(({ name, state }) => {
    if (name === 'F8' && state === 'DOWN') {
      addStats();
      player
        .play({
          path: path.resolve('assets/ping.wav'),
        })
        .catch(console.error);
    }
  });
  console.log('Screenshot hotkey bound to F8');
}

async function addStats() {
  try {
    // TODO check for name and ID
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

init();
