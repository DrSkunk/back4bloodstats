// const { firestore } = require('./firebase');
// const testRef = firestore.db.collection('cities');
const axios = require('axios');
const { getUsername, getUserId } = require('./database');

const baseUrl = 'http://localhost:3000/api/';

async function addOnlineEntry(entry) {
  const name = getUsername();
  const userId = getUserId();
  await axios.post(`${baseUrl}addEntry`, { ...entry, userId, name });
}

module.exports = {
  addOnlineEntry,
};
