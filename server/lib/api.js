// const { firestore } = require('./firebase');
// const testRef = firestore.db.collection('cities');
const axios = require('axios');

const baseUrl = 'http://localhost:3000/api/';

async function addOnlineEntry(entry) {
  // const snapshot = await testRef.get();
  // snapshot.forEach((doc) => {
  //   console.log(doc.id, '=>', doc.data());
  // });
  await axios.post(`${baseUrl}addEntry`, entry);
}

module.exports = {
  addOnlineEntry,
};
