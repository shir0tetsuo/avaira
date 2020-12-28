exports.run = (client, message, params, perms) => {
  var R = '\n';
  R += `:green_square: Database OK\n`
  R += `:new_moon: Selected\n`
  R += `:black_circle: Empty Node\n`
  R += `:coin: Owned Node\n`
  R += `:blue_circle: Other Owned, Lack Level\n`
  R += `:nazar_amulet: Other Owned, Administrator Node\n`
  R += `:white_circle: Other Owned, Purchasable\n`
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
