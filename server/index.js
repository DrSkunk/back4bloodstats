const path = require('path');
const { takeScreenshot } = require('./lib/screenshot');
const { GlobalKeyboardListener } = require('node-global-key-listener');
const { parseTitle, parseStats } = require('./lib/ocr');
const { startWebServer, showEntry } = require('./lib/webserver');
const { addEntry } = require('./lib/database');
const { addOnlineEntry } = require('./lib/api');

const player = require('node-wav-player');

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

async function addStats() {
  try {
    const { titleImage, statsImage } = await takeScreenshot();
    const title = await parseTitle(titleImage);
    const { riddenKills, mutationKills } = await parseStats(statsImage);
    console.log('Read the following data:');
    console.log(`title: ${title}`);
    console.log(`riddenKills: ${riddenKills}`);
    console.log(`mutationKills: ${mutationKills}`);
    const entry = { title, riddenKills, mutationKills };
    // addEntry(entry);
    // showEntry(entry);
  } catch (error) {
    console.error('Failed to parse screenshot');
    console.error(error);
  }
}

addOnlineEntry({ title: 'test', riddenKills: 1, mutationKills: 2 });
