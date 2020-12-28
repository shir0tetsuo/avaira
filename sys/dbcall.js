exports.userCall = async (client) => {
  client.map.sync();
  client.dbusers.sync();
  client.xtra.sync();
  console.log('Synchronized')
}
