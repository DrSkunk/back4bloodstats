const screenshot = require('screenshot-desktop');
const fs = require('fs/promises');
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
  const baseName = new Date().toISOString().replace(/:/g, '-');

  await fs.writeFile(`./screenshots/${baseName}.png`, wholeScreen);
  await fs.writeFile(`./screenshots/${baseName}_title.png`, titleImage);
  await fs.writeFile(`./screenshots/${baseName}_stats.png`, statsImage);

  return {
    titleImage,
    statsImage,
  };
}

async function extractSections(wholeImage) {
  const sections = [
    {
      key: 'act',
      width: 500,
      height: 28,
      left: 40,
      top: 24,
    },
    {
      key: 'chapter',
      width: 650,
      height: 45,
      left: 40,
      top: 50,
    },
    {
      key: 'stats',
      width: 300,
      height: 115,
      left: 640,
      top: 550,
    },
  ];
  const bufferPromises = sections.map(async (section) => {
    const contrast = 4;
    const buffer = await sharp(wholeImage)
      .extract({
        width: section.width,
        height: section.height,
        left: section.left,
        top: section.top,
      })
      .grayscale()
      .linear(contrast, -(0.5 * contrast) + 0.5)
      .toBuffer();
    return {
      key: section.key,
      buffer,
    };
  });
  const buffers = await Promise.all(bufferPromises);
  const result = buffers.reduce((acc, { key, buffer }) => {
    acc[key] = buffer;
    return acc;
  }, {});
  return result;
}

module.exports = {
  getDisplays,
  takeScreenshot,
  extractSections,
};
