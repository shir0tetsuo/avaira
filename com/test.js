const settings = require('../settings.json');
const B = require('../sys/hyperbank.js')

exports.run = async (client, message, params, perms) => {
  timeNow = new Date();
  timeNow = timeNow*1 - 86400000
  timeSaved = timeNow.toLocaleString()
  const tag = client.xtra.update({grind_call: timeSaved},{where: {user_id: message.author.id}})
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['tst'],
  permLevel: 4
};

exports.help = {
  name: 'test',
  description: 'Nothing.',
  usage: 'test [???]'
};
