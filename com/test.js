const settings = require('../settings.json');
const B = require('../sys/hyperbank.js')

exports.run = async (client, message, params, perms) => {
  B.bankSilver(client, message, 2, message.author.id)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tst'],
  permLevel: 4
};

exports.help = {
  name: 'test',
  description: 'Nothing.',
  usage: 'test [???]'
};
