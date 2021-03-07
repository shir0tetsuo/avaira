const settings = require('../settings.json')

exports.run = (client, message, params, perms) => {
  let member = message.mentions.users.first()
  if (!message.mentions.users.first()) return;
  try {
    const tag = client.dbusers.create({
      user_id: member.id,
      permission: 0,
      level: 1,
      silver: 10,
      gold: 0,
      mrecord: 1,
    }).catch(e => {
      //console.log(e)
    })
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      console.log('Tag Exists')
    } else {
      //console.log(e)
    }
  } finally {
    const tag = client.dbusers.findOne({ where: { user_id: member.id } }).then(t => {
      message.author.send(`\`user_id ${t.user_id}\` LEVEL \`${t.level}\` AUTH**\`${t.permission}\`** S\`${t.silver}\` G\`${t.gold}\` MREC\`${t.mrecord}\``)
    })
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['o'],
  permLevel: 1
};

exports.help = {
  name: 'observe',
  description: 'Display information about a user',
  usage: 'o [mention]'
};
