function clean(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9" "]/g, '')
    .replace(/ /g, '_');
}

function getFileName({ act, chapter, riddenKills, mutationKills }) {
  const cleanAct = clean(act);
  const cleanChapter = clean(chapter);
  return `${cleanAct}-${cleanChapter}-${riddenKills}-${mutationKills}.png`;
}

module.exports = { clean, getFileName };
