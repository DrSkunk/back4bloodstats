const uuid = require('uuid');
const inquirer = require('inquirer');

const {
  getUserId,
  setUserId,
  getUsername,
  setUsername,
  getSecret,
  setSecret,
} = require('./database');

getUserId();

async function getConfig() {
  let userId = getUserId();
  if (!userId) {
    userId = uuid.v4();
    setUserId(userId);
  }
  let username = getUsername(userId);
  if (!username) {
    const result = await inquirer.prompt([
      {
        name: 'userName',
        type: 'input',
        message: 'Which username would you like to appear in the stats?',
      },
    ]);
    username = result.userName;
    setUsername(username);
  }
  let secret = getSecret(userId);
  if (!secret) {
    const result = await inquirer.prompt([
      {
        name: 'secret',
        type: 'input',
        message: "What's the secret?",
      },
    ]);
    secret = result.secret;
    setSecret(secret);
  }
  return { userId, username, secret };
}

module.exports.getConfig = getConfig;
