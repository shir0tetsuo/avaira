const chalk = require('chalk')
const settings = require('../settings.json')

// user = await B.readUser(client, message.author.id)
exports.readUser = async (client, user_id) => {
  return tag = await client.dbusers.findOne({ where: {user_id: user_id}})
}

// B.bankSilver(client, message, v, user_id)
// silver = silver+v
exports.bankSilver = async (client, message, v, user_id) => {
  if (!v) v = 1, console.log(chalk.redBright('Silver Value = 1'))
  var value = Math.round(parseInt(v));
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
    if (e.name === 'SequelizeUniqueConstraintError') console.log(chalk.greenBright(`DOCUMENT EXIST ${user_id}`))
  } finally {
    const tag = client.dbusers.findOne({ where: { user_id: user_id } }).then(r => {
      value = Math.round(value + parseInt(r.silver)); // Calculator
      const affect = client.dbusers.update({silver: value},{where:{user_id: user_id}}).then(ao=>{
        message.react('🟢')
        let opString = `${r.silver}(+${v})=>${value}`
        console.log(chalk.blueBright(`OPERATION:`),`${(new Date()) - message.ActionTime.getTime()}ms :: ${opString}`,chalk.blueBright('SILVER'),user_id)
      })
    })
  }
}

// B.bankGold(client, message, v, user_id)
// gold = gold+v
exports.bankGold = async (client, message, v, user_id) => {
  if (!v) v = 1, console.log(chalk.redBright('Gold Value = 1'))
  var value = Math.round(parseInt(v));
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
    if (e.name === 'SequelizeUniqueConstraintError') console.log(chalk.greenBright(`DOCUMENT EXIST ${user_id}`))
  } finally {
    const tag = client.dbusers.findOne({ where: { user_id: user_id } }).then(r => {
      value = Math.round(value + parseInt(r.gold)); // Calculator
      const affect = client.dbusers.update({gold: value},{where:{user_id: user_id}}).then(ao=>{
        message.react('🟢')
        let opString = `${r.gold}(+${v})=>${value}`
        console.log(chalk.blueBright(`OPERATION:`),`${(new Date()) - message.ActionTime.getTime()}ms :: ${opString}`,chalk.yellowBright('GOLD'),user_id)
      })
    })
  }
}

// B.bankLevel(client, message, v, user_id)
// level = level+v
exports.bankLevel = async (client, message, v, user_id) => {
  if (!v) v = 1, console.log(chalk.redBright('Level Value = 1'))
  var value = Math.round(parseInt(v));
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
    if (e.name === 'SequelizeUniqueConstraintError') console.log(chalk.greenBright(`DOCUMENT EXIST ${user_id}`))
  } finally {
    const tag = client.dbusers.findOne({ where: { user_id: user_id } }).then(r => {
      value = Math.round(value + parseInt(r.level)); // Calculator
      const affect = client.dbusers.update({level: value},{where:{user_id: user_id}}).then(ao=>{
        message.react('🟢')
        let opString = `${r.level}(+${v})=>${value}`
        console.log(chalk.blueBright(`OPERATION:`),`${(new Date()) - message.ActionTime.getTime()}ms :: ${opString}`,chalk.yellowBright('LEVEL'),user_id)
      })
    })
  }
}

// B.elevateAuthority(client, message, v, user_id, perms)
// auth = v
exports.elevateAuthority = async (client, message, v, user_id, perms) => {
  if (perms < 4) return message.reply(`\`AUTH < 4\`\`\`\`diff\n- UNAUTHORIZED\`\`\``)
  if (!v) v = 1, console.log(chalk.redBright('AUTH Value = 1'))
  if (settings.owner == user_id) return console.log(chalk.redBright('Cannot escalate authority: Administrator'))

  var value = Math.round(parseInt(v));


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
    if (e.name === 'SequelizeUniqueConstraintError') console.log(chalk.greenBright(`DOCUMENT EXIST ${user_id}`))
  } finally {
    const tag = client.dbusers.findOne({ where: { user_id: user_id } }).then(r => {
      value = Math.round(value + parseInt(r.permission));
      if (value > 3) value = 3, message.react('🔶');
      const affect = client.dbusers.update({permission: value},{where:{user_id: user_id}}).then(ao=>{
        message.react('🟢')
        let opString = `${r.permission}(+${v})=>${value}`
        console.log(chalk.blueBright(`OPERATION:`),`${(new Date()) - message.ActionTime.getTime()}ms :: ${opString}`,chalk.redBright('AUTH'),user_id)
      })
    })
  }
}
