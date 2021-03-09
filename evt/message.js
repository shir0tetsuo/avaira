const settings = require('../settings.json');
const chalk = require('chalk')
const B = require('../sys/hyperbank.js')
const rand = require('../sys/rand.js')

let timeout = new Set();

module.exports = async message => {
  // header information
  let ActionTime = new Date();
  let client = message.client;
  message.ActionTime = ActionTime // cmd activation time

  // filters
  if (message.author.bot) return; // no bots
  if (message === null) return; // no nulls

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //// UMRecord
  await B.uMRecord(client, message)
  user = await B.readUser(client, message.author.id)
  // Update Message Sequence
  lvluplist = ['Yay! You went up a level.', 'Level Up!', 'Your level changed!', '+1 Level!']
  const levelCalculated = Math.floor(0.4 * Math.sqrt(user.mrecord));
  const levelRewardGold = Math.floor(user.mrecord / 12);
  const levelRewardSilver = 10 + Math.floor(user.mrecord / 10) + levelCalculated;
  if (levelCalculated > user.level) {
    await B.bankLevel(client, message, 1, message.author.id)
    await B.bankGold(client, message, levelRewardGold, message.author.id)
    await B.bankSilver(client, message, levelRewardSilver, message.author.id)
    let replym = rand(lvluplist)
    message.reply(`${replym} \`(${Math.floor(user.level + 1)})\``).then(m => {
      setTimeout(() => {
        m.delete()
      }, 5000)
    })
  }
  //console.log(levelCalculated, message.author.id, user.level, user.mrecord)
  //////////////////////////////////////////////////////////////////////////////


  if (!message.content.toLowerCase().startsWith(settings.prefix)) return;

  // 2 sec timeout
  if (timeout.has(message.author.id)) return message.author.send("Slow down, Speedy!")
  timeout.add(message.author.id);
  setTimeout(() => {
    timeout.delete(message.author.id);
  }, 2000)

  // identify command
  let command = message.content.split(' ')[0].slice(settings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  // controller (init zero) -> user elev. -> .then(run)

  if (cmd){
    // Calculate Owner Auth => User Sequence
    var authPerm = 0
    if (message.author.id == settings.owner) var authPerm = 4;

    // User Sequence
    await B.initUser(client, message, message.author.id, authPerm)
    if (!user) user = await B.readUser(client, message.author.id)




    await B.initXtra(client, message, message.author.id)
    // update message record

    //xtra = await B.readXtra(client, message.author.id)

    // Authority Intelligence
    let perms = user.permission;

    // set auth 1 if over lv 5
    if (user.level >= 5 && perms < 1) {
      await B.elevateAuthority(client, message, 1, message.author.id, perms)
      perms = 1
      message.reply(`you are now authorized to use \`AUTH1\` commands \`see ..help\``)
    }


    if (cmd.conf.guildOnly == true && message.channel.type === "dm") return;
    if (cmd.conf.enabled == false) return;
    if (perms < cmd.conf.permLevel) return;

    // Carrier Stats
    message.author.level = user.level;
    message.author.silver = user.silver;
    message.author.gold = user.gold;
    message.author.authority = user.permission
    // might not need this but oh well
    message.author.mrecord = user.mrecord;
    //console.log(user.mrecord)
    message.author.xtra = await B.readXtra(client, message.author.id);
    //console.log(message.author.xtra.grind_call)




    message.react('❤️')

    // EXECUTE
    cmd.run(client, message, params, perms);
  }


};
