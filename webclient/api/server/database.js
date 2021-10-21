const { firestore, serverTimestamp } = require("./firebase");

const ref = firestore.collection("stats");

async function addEntry(entry) {
  const res = await ref.add({
    createdAt: serverTimestamp(),
    ...entry,
  });
  console.log(`Added document with ID ${res.id}`);
  console.log(res);
  return res;
}
module.exports = { addEntry };
