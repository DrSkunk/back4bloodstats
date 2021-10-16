const screenshot = require('screenshot-desktop');
const sharp = require('sharp');
async function getDisplays() {
  return screenshot.listDisplays();
}

async function takeScreenshot() {
  console.log('Taking screenshot');
  const display = (await getDisplays())[0];
  const wholeScreen = await screenshot({ screen: display.id, format: 'png' });
  const titleImage = await sharp(wholeScreen)
    .extract({
      width: 700,
      height: 120,
      left: 0,
      top: 0,
    })
    .toBuffer();
  const statsImage = await sharp(wholeScreen)
    .extract({
      width: 300,
      height: 115,
      left: 640,
      top: 550,
    })
    .toBuffer();
  return {
    titleImage,
    statsImage,
  };
}

module.exports = {
  getDisplays,
  takeScreenshot,
};
