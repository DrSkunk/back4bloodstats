const path = require('path');
const JSONdb = require('simple-json-db');

const db = new JSONdb(path.resolve('database.json'));

function addEntry(title, riddenKills, mutationKills) {
  const key = new Date().toISOString();
  console.log(`Added to database with key ${key}`);
  const entry = {
    title,
    riddenKills,
    mutationKills,
  };
  db.set(key, entry);
}

function getEntries() {
  return db.JSON();
}

module.export = {
  addEntry,
  getEntries,
};
