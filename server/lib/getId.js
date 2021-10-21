const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

let id;

function getId() {
  if (id) {
    return id;
  }
  try {
    id = fs.readFileSync(path.resolve('.id'), 'utf8');
    if (uuid.validate(id)) {
      console.log('Found ID', id);
      return id;
    }
  } catch (error) {
    console.log('Creating new ID');
  }
  id = uuid.v4();
  fs.writeFileSync(path.resolve('.id'), id);
  console.log('Created ID', id);
  id;
}
module.exports.getId = getId;
