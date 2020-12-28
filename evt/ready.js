const settings = require('../settings.json')
const chalk = require('chalk')
const dbc = require('../sys/dbcall.js')
//const transit = require('../sys/maptransit.js')

module.exports = async client => {

  // Display Version
  client.user.setActivity(settings.version)

  // DB Sync
  await dbc.userCall(client)

  console.log(chalk.blueBright(`0 AVAIRA READY v${settings.version}\n0 AVAIRA READY v${settings.version}`))
};
