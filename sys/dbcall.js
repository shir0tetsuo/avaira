exports.userCall = async (client) => {
  client.map.sync();
  client.dbusers.sync();
  client.xtra.sync();
  client.pocket.sync();
  console.log('Synchronized')
}
