
// https://discordjs.guide/additional-info/changes-in-v12.html#send

console.log("Initializing.")

const settings = require('./settings.json') // settings
const fs = require("fs") // filesystem mgmt
const Discord = require("discord.js"); // discord client
const client = new Discord.Client(); // discord client

require('./sys/events.js')(client); // ** sys/eventLoader


var initDate = new Date();
////////////////////////////////////////////////////////////////////////////////
client.login(settings.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./com/', (err, files) => { // ** main
  if (err) console.err(err);
  console.log(`${files.length} Plugins Found in ./com/`)
  files.forEach(f => {
    let fileread = require(`./com/${f}`);
    var initEndDate = new Date();
    console.log(`NODE: ${fileread.help.name} (${initEndDate.getTime() - initDate.getTime()}ms)`)
    client.commands.set(fileread.help.name, fileread);
    fileread.conf.aliases.forEach(alias => {
      client.aliases.set(alias, fileread.help.name);
    })
  })
})

client.on('error', console.error)
