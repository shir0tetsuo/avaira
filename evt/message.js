const settings = require('../settings.json');

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
    // write zero db

    // user permissions
    let perms = 0;

    // returns
    if (cmd.conf.guildOnly == true && message.channel.type === "dm") return;
    if (cmd.conf.enabled == false) return;
    if (perms < cmd.conf.permLevel) return;

    // user awareness
    message.react('❤️')

    // execution
    cmd.run(client, message, params, perms);
  }


};
