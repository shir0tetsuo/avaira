// Store date time, pull date time, cross reference to database map
// for each (node.value) -> string, divide by n - properties, 48 hr lock
// for 20 properties, +1 gold
exports.run = (client, message, params, perms) => {

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['d'],
  permLevel: 4
};

exports.help = {
  name: 'daily',
  description: 'Gather resources from node capture.',
  usage: 'd'
};
