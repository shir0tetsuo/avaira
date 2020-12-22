const settings = require('../settings.json');
const chalk = require('chalk')

let timeout = new Set();

module.exports = message => {
  // header information
  let ActionTime = new Date();
  let client = message.client;
  message.ActionTime = ActionTime // cmd activation time

  // filters
  if (message.author.bot) return; // no bots
  if (message === null) return; // no nulls
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
    // Calculate Owner Auth
    var authPerm = 0
    if (message.author.id == settings.owner) var authPerm = 4;

    // Write New Entry
    try {
      const tag = client.dbusers.create({
        user_id: message.author.id,
        permission: authPerm,
        level: 1,
        silver: 0,
        gold: 0,
      }).catch(err=>{
        // If Unique Exists
        if (err.name === 'SequelizeUniqueConstraintError') {
          console.log('WRITE FAILED (Exists)')
        }
      })
      console.log(chalk.greenBright('WRITE',message.author.id))
    }
    // Unusual Error Handling
    catch (e) {
      console.log(e)
      if (e.name === 'SequelizeUniqueConstraintError') {
        console.log('Tag Exists')
      } else {
        console.log(chalk.redBright('Database Error 50'))
        console.log(e)
      }
    }

    // Find Permission and Execute
    finally {
      const tag = client.dbusers.findOne({ where: { user_id: message.author.id } }).then(t=>{
        let perms = t.permission;
        // returns
        if (cmd.conf.guildOnly == true && message.channel.type === "dm") return;
        if (cmd.conf.enabled == false) return;
        if (perms < cmd.conf.permLevel) return;
        // user awareness
        message.react('❤️')
        // avaira awareness
        // random reaction

        // execution
        //console.log(authPerm, perms, t.permission)
        message.author.level = t.level;
        message.author.silver = t.silver;
        message.author.gold = t.gold;
        cmd.run(client, message, params, perms);
        //console.log('USER:',t.user_id,'PERM',t.permission,'LVL',t.level,'SLVR',t.silver,'GOLD',t.gold)
      })
    }
    // close transit file
    // depreciated
  }


};
