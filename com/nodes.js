const settings = require('../settings.json')

exports.run = async (client, message, params, perms) => {

  //const tagList = await client.map.findAll({ attributes: ['coordinate','owner_id','silver','gold']})
  const tagList = await client.map.findAll({ where: { owner_id: message.author.id } })
  Properties = tagList.length
  if (!isNaN(params[0])) {
    let SliceA = (params[0] - 1) * 10;
    let SliceB = params[0] * 10;
    const tagString = tagList.map(t => `\`${t.coordinate}\`, ${t.silver} Silver, ${t.gold} Gold`).slice(SliceA,SliceB).join('\n')
    var Reply = '';
    Reply += `**__Nodes__**\n`
    Reply += `${tagString}\nNodes: Page ${params[0]} (${SliceA+1} - ${SliceB} / ${Properties})`
    message.reply(Reply)
  } else {
    const tagString = tagList.map(t => `\`${t.coordinate}\`, ${t.silver} Silver, ${t.gold} Gold`).slice(0,10).join('\n')
    var Reply = '';
    Reply += `**__Nodes__**\n`
    Reply += `${tagString}\nNodes: ${Properties}`
    message.reply(Reply)
  }
  //MostExpenseSilver = tagList.map(t => `${t.silver} Silver, \`${t.coordinate}\`, ${t.gold} Gold`).sort((a,b) => a - b).reverse().slice(0,5).join('\n')
  //MostExpensiveGold = tagList.map(t => `${t.gold} Gold, \`${t.coordinate}\`, ${t.silver} Silver`).sort().reverse().slice(0,5).join('\n')




  //const [res,meta] = await client.map.query(`SELECT * FROM map WHERE user_id = ${message.author.id}`)
  //P = res.map(t => `${t.coordinate} ${t.user_id} ${t.silver} ${t.gold}`).join('\n')
  //console.log(P)
  //const tagList = await client.map.findAll({ attributes: ['user_id','silver','gold']}, { where: { user_id: message.author.id }, limit: 10 });
  //const tagString = tagList.map(t => `${t.user_id}, ${t.silver}, ${t.gold}`).join('\n') || 'Data Err.';
  //console.log(tagString)
  //message.channel.send(`List: ${tagString}`);
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
  usage: 'nodes [page]'
};
