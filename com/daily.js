// Store date time, pull date time, cross reference to database map
// for each (node.value) -> string, divide by n - properties, 48 hr lock
// for 20 properties, +1 gold

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const B = require('../sys/hyperbank.js')

exports.run = async (client, message, params, perms) => {

  // Need xtra database
  if (!message.author.xtra) message.author.xtra = await B.readXtra(client, message.author.id)

  // Calculate Expiry
  var d = new Date(message.author.xtra.grind_call);
  let now = new Date();
  let expiry = d*1 + 86400000

  //console.log('21')
  // expiry time not up
  if (expiry > now) {
    //console.log('24')
    message.reply(`you can run this command after the 24 hours have passed @ \`${new Date(expiry)}\``)

    // Expiry time up
  } else {
    // Find Nodes
    const nodes = await client.map.findAll({ where: { owner_id: message.author.id } })
    Properties = nodes.length

    // Minimum Filter
    if (!Properties || Properties == 0) return message.reply(`You must have at least one node property on the map matrix.`)

    // Update Time System
    const nowStr = await B.xDaily(client, message);

    // Calculate Wealth
    var wealth = {};
    wealth.silver = 0;
    wealth.gold = 0;
    (async function loop() {
      for (i = 0; i < Properties; i++) {
        //console.log(nodes[i].silver)
        //console.log(wealth.silver,wealth.gold)
        wealth.silver = wealth.silver + nodes[i].silver
        wealth.gold = wealth.gold + nodes[i].gold
      }
    })().then(r => {
      tax = Properties
      wealth.silver = parseInt(wealth.silver) - Properties + 2
      wealth.silver = wealth.silver/3
      if (wealth.silver < 0) wealth.silver = 0;
      goldTax = getRandomInt(50)
      wealth.gold = wealth.gold/10 - goldTax
      if (wealth.gold < 0) wealth.gold = 1;
      wealth.silver = Math.round(wealth.silver)
      wealth.gold = Math.round(wealth.gold)
      B.bankSilver(client, message, wealth.silver, message.author.id)
      B.bankGold(client, message, wealth.gold, message.author.id)
      message.R = '';
      message.react('<:foxrose:575068692887371850>')
      message.R += `You've earned \`${wealth.silver}\`S and \`${wealth.gold}G\` over \`${Properties}\` Nodes!\n`
      message.R += `You were taxed \`${Properties - 2}\`S and \`${goldTax}\`G.\n`
      message.R += `You can run this again in 24 hours.`
      message.reply(`${message.R}`)
    })
  }
}

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: ['d'],
  permLevel: 0
};

exports.help = {
  name: 'daily',
  description: 'Gather resources from node capture.',
  usage: 'd'
};
