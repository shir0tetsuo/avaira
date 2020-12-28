const C = require('../sys/cartographer.js')

exports.run = async (client, message, params, perms) => {
  if (!params[3]) return message.reply(`not enough parameters.`)
  if (params[0].length != 6) return message.reply(`Address Invalid.`)
  C.xBitEditor(client, message, params)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rm','mod','regmap'],
  permLevel: 4
};

exports.help = {
  name: 'dmve',
  description: 'Direct map value editor',
  usage: 'mod [address] [owner_id] [silver] [gold]'
};
