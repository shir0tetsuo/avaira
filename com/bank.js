const settings = require('../settings.json')
const B = require('../sys/hyperbank.js')

exports.run = async (client, message, params, perms) => {
  let member = message.mentions.users.first()
  if (!message.mentions.users.first()) return message.react('🖤');
  if (isNaN(params[0]) || isNaN(params[1]) || isNaN(params[2])) return message.react('🖤');
  user = await B.readUser(client, member.id);
  B.bankLevel(client, message, params[0], member.id)
  B.bankSilver(client, message, params[1], member.id)
  B.bankGold(client, message, params[2], member.id)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['b'],
  permLevel: 3
};

exports.help = {
  name: 'bank',
  description: 'Increment user stats.',
  usage: 'b [level] [silver] [gold] @mention'
};
