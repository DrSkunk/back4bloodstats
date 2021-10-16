const { takeScreenshot } = require('./screenshot');
const { GlobalKeyboardListener } = require('node-global-key-listener');
const { parseTitle, parseStats } = require('./ocr');
const { startWebServer, showEntry } = require('./webserver');
const { addEntry } = require('./database');

startWebServer();

const hotkeys = new GlobalKeyboardListener();
hotkeys.addListener(({ name, state }) => {
  if (name === 'F8' && state === 'DOWN') {
    addStats();
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
    addEntry(entry);
    showEntry(entry);
  } catch (error) {
    console.error('Failed to parse screenshot');
    console.error(error);
  }
}
