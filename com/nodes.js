const settings = require('../settings.json')

exports.run = async (client, message, params, perms) => {

  //const tagList = await client.map.findAll({ attributes: ['coordinate','owner_id','silver','gold']})
  var other = message.mentions.users.first();
  var poke = message.author.id;
  if (other) poke = other.id;

  const tagList = await client.map.findAll({ where: { owner_id: poke } })
  Properties = tagList.length
  if (!isNaN(params[0])) {
    let SliceA = (params[0] - 1) * 10;
    var SliceB = params[0] * 10;
    const tagString = tagList.map(t => `\`${t.coordinate}\`, ${t.silver} Silver, ${t.gold} Gold`).slice(SliceA,SliceB).join('\n')
    var Reply = '';
    Reply += `\n**__Nodes__**\n`
    if (SliceB > Properties) SliceB = Properties
    Reply += `${tagString}\nNodes: Page ${params[0]} (${SliceA+1} - ${SliceB} / ${Properties})`
    if (other) {
      Reply += ` (${other.id})`
      message.react('💙')
      message.author.send(Reply)
      return
    }
    message.reply(Reply)
  } else {
    const tagString = tagList.map(t => `\`${t.coordinate}\`, ${t.silver} Silver, ${t.gold} Gold`).slice(0,10).join('\n')
    var Reply = '';
    Reply += `\n**__Nodes__**\n`
    Reply += `${tagString}\nNodes: ${Properties}`
    if (other) {
      Reply += ` (${other.id})`
      message.react('💙')
      message.author.send(Reply)
      return
    }
    message.reply(Reply)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['n'],
  permLevel: 0
};

exports.help = {
  name: 'nodes',
  description: 'Prints owned map nodes.',
  usage: 'nodes [page] (mention)'
};
