exports.run = (client, message, params, perms) => {
  var R = '\n';
  R += `:new_moon: Selected\n`
  R += `:black_circle: Empty Node\n`
  R += `:white_circle: Owned Node\n`
  //R += `:blue_circle: Ally\n`
  R += `:yellow_circle: Other Owned, Purchasable\n`
  R += `:purple_circle: Other Owned, Lack Silver\n`
  R += `:brown_circle: Other Owned, Lack Gold\n`
  R += `:orange_circle: Other Owned, Lack Silver & Gold`
  message.reply(R)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['l'],
  permLevel: 0
};

exports.help = {
  name: 'legend',
  description: 'Node matrix legend.',
  usage: 'l'
};
