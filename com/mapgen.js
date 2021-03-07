const settings = require('../settings.json');

exports.run = (client, message, params, perms) => {

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['m'],
  permLevel: 4
};

exports.help = {
  name: 'mapgen',
  description: '.',
  usage: 'blank [???]'
};
