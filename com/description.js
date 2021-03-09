const settings = require('../settings.json');
const C = require('../sys/cartographer.js')


exports.run = async (client, message, params, perms) => {
  desc = message.content.split(' ').slice(2);
  if (!params[0] || params[0].length != 6) return message.reply(`${params[0]} is not a valid address.`)
  if (desc.length > 30) return message.reply(`your description must be under 30 characters.`)
  bit = await client.map.findOne({ where: {coordinate: params[0]}})
  if (!bit) {
    return message.reply(`System Error: 404`)
  } else {
    if (message.author.authority >= 4 || bit.owner_id == message.author.id) {
      C.changeDesc(client, params[0], desc.join(' '))
      message.reply(`change successful!`)
    } else {
      message.reply(`access denied!`)
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['d', 'desc'],
  permLevel: 1
};

exports.help = {
  name: 'description',
  description: 'Tag areas with descriptions.',
  usage: 'description [ADDRESS] TXT(40)'
};
