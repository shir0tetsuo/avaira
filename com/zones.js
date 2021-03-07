const settings = require('../settings.json');

exports.run = (client, message, params, perms) => {
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['z'],
  permLevel: 1
};

exports.help = {
  name: 'zones',
  description: 'Display and purchase zones.',
  usage: 'z [ID]\n[ID] = '
};
