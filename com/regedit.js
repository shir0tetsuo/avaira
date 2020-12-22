const settings = require('../settings.json')
exports.run = (client, message, params, perms) => {
  console.log('permission',params[1],'level',params[2],'silver',params[3],'gold',params[4])
  const tag = client.dbusers.update({ permission: params[1], level: params[2], silver: params[3], gold: params[4], }, { where: { user_id: params[0] }}).then(r => {
    message.react('💚')
  }).catch(e=>{
    console.log(e)
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rx'],
  permLevel: 4
};

exports.help = {
  name: 'regedit',
  description: 'Direct registry editor (owner only)',
  // 0 user_id 1 perm 2 lvl 3 silver 4 gold
  usage: 'regedit [user_id] [perm] [lvl] [slvr] [gold]'
};
