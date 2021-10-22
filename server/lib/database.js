const path = require('path');
const JSONdb = require('simple-json-db');

const db = new JSONdb(path.resolve('database.json'));

// function addEntry(title, riddenKills, mutationKills) {
//   const key = new Date().toISOString();
//   console.log(`Added to database with key ${key}`);
//   const entry = {
//     title,
//     riddenKills,
//     mutationKills,
//   };
//   db.set(key, entry);
// }

function setUsername(name) {
  db.set('name', name);
}

function getUsername() {
  return db.get('name');
}

function getUserId() {
  return db.get('userId');
}

function setUserId(id) {
  db.set('userId', id);
}

function getEntries() {
  return db.JSON();
}

module.exports = {
  // addEntry,
  getEntries,
  getUsername,
  setUsername,
  getUserId,
  setUserId,
};
