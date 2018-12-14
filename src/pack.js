const { execSync } = require('child_process');
const path = require('path');

function pack(params, account) {
  const { log } = console;
  const {
    distFolderPath,
    botName,
    cleanUpJSONFile = true,
  } = params;

  const jsPath = path.join(distFolderPath, `${botName}.js`);
  const jsonPath = path.join(account || '', `${botName}.json`);

  const args = account
    ? `'${account}'`
    : '';

  if (account) {
    try {
      log(`Creating account folder: ${account}`);
      execSync(`mkdir ${account}`);
    } catch (err) {
      // console.log(err);
    }
  } else {
    log('ℹ️  No AWS account specified, creating files at project root');
  }

  const navigate = account
    ? `cd ${account} && `
    : '';

  execSync(`node ${jsPath} ${args} > ${jsonPath}`);
  execSync(`${navigate}zip ${botName}.zip ${botName}.json`);

  if (cleanUpJSONFile) {
    log(`ℹ️  Cleaning up JSON file at ${path.join(distFolderPath, jsonPath)}`);
    execSync(`rm ${jsonPath}`);
  }

  const zipPath = path.join(distFolderPath, account || '', `${botName}.zip`);
  log(`👍 ${account} bot packaged at: ${zipPath}`);
}

module.exports = pack;
