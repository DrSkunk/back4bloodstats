const axios = require('axios');
const { getConfig } = require('./getConfig');

const baseUrl = 'http://localhost:3000/api/';

async function addOnlineEntry(entry) {
  const { userId, username, secret } = await getConfig();
  console.log({
    ...entry,
    userId,
    username,
    secret,
  });
  await axios.post(`${baseUrl}addEntry`, {
    ...entry,
    userId,
    username,
    secret,
  });
}

module.exports = {
  addOnlineEntry,
};
