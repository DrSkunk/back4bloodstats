const uuid = require('uuid');
const inquirer = require('inquirer');

const {
  getUserId,
  setUserId,
  getUsername,
  setUsername,
} = require('./database');

getUserId();

async function getUser() {
  let userId = getUserId();
  if (!userId) {
    userId = uuid.v4();
    setUserId(userId);
  }
  let userName = getUsername(userId);
  if (!userName) {
    const result = await inquirer.prompt([
      {
        name: 'userName',
        type: 'input',
        message: 'Which username would you like to appear in the stats?',
      },
    ]);
    userName = result.userName;
    setUsername(userName);
  }
  return { userId, userName };
}

module.exports.getUser = getUser;
