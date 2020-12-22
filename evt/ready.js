const settings = require('../settings.json')
const chalk = require('chalk')
//const transit = require('../sys/maptransit.js')

module.exports = client => {

  // Display Version
  client.user.setActivity(settings.version)

  // DB Sync
  client.map.sync();
  client.dbusers.sync();

  console.log(chalk.blueBright(`0 AVAIRA READY v${settings.version}\n0 AVAIRA READY v${settings.version}`))
};
