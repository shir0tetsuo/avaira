const chalk = require('chalk')

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
      value = Math.round(value + parseInt(r.silver));
      const affect = client.dbusers.update({silver: value},{where:{user_id: user_id}}).then(ao=>{
        message.react('🟢')
        let opString = `${r.silver}(+${v})=>${value}`
        console.log(chalk.blueBright(`OPERATION:`),`${(new Date()) - message.ActionTime.getTime()}ms :: ${opString}`,chalk.blueBright('SILVER'),user_id)
      })
    })
  }
}

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
      value = Math.round(value + parseInt(r.gold));
      const affect = client.dbusers.update({gold: value},{where:{user_id: user_id}}).then(ao=>{
        message.react('🟢')
        let opString = `${r.gold}(+${v})=>${value}`
        console.log(chalk.blueBright(`OPERATION:`),`${(new Date()) - message.ActionTime.getTime()}ms :: ${opString}`,chalk.yellowBright('GOLD'),user_id)
      })
    })
  }
}
