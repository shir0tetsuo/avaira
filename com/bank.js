const settings = require('../settings.json')

exports.run = (client, message, params, perms) => {
  let member = message.mentions.users.first()
  if (!message.mentions.users.first()) return message.react('🖤');
  if (isNaN(params[0]) || isNaN(params[1]) || isNaN(params[2])) return message.react('🖤');
  try {
    const tag = client.dbusers.create({
      user_id: member.id,
      permission: 0,
      level: 1,
      silver: 10,
      gold: 0,
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
      var nlvl = Math.round(parseInt(t.level) + parseInt(params[0])),
      nslv = Math.round(parseInt(t.silver) + parseInt(params[1])),
      ngld = Math.round(parseInt(t.gold) + parseInt(params[2]));
      const affectOther = client.dbusers.update({ level: nlvl, silver: nslv, gold: ngld },{where: { user_id: member.id }}).then(ao => {
        message.react('🟢')
        if (params[0] > 0) message.react('💖')
        if (params[1] > 0) message.react('791893131518935061')
        if (params[2] > 0) message.react('791893120689111090')
      })
    })
  }
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
