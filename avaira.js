// December 2020
// https://discordjs.guide/additional-info/changes-in-v12.html#send
// https://github.com/discordjs/guide/blob/master/code-samples/sequelize/tags/sequelize.js
const chalk = require('chalk')

const settings = require('./settings.json') // settings
const fs = require("fs") // filesystem mgmt
const Sequelize = require('sequelize')
const Discord = require("discord.js"); // discord client
const client = new Discord.Client(); // discord client

// Database Initialization
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'avaira.db',
});

//CREATE, READ, UPDATE, DELETE
//Init -> Blueprint -> (READY) -> Read -> Update

// Database Blueprint
/////////////////////////////////////////////
const Users = sequelize.define('users', {
  user_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  permission: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  level: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  silver: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  gold: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

const M = sequelize.define('mapdata', {
  coordinate: {
    type: Sequelize.STRING,
    unique: true,
  },
  owner_id: {
    type: Sequelize.STRING,
  },
  silver: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  gold: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
})

client.map = M;
client.dbusers = Users;
//client.db.plots = Plots;

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
    console.log(chalk.greenBright(`NODE: ${fileread.help.name} (${initEndDate.getTime() - initDate.getTime()}ms)`))
    client.commands.set(fileread.help.name, fileread);
    fileread.conf.aliases.forEach(alias => {
      client.aliases.set(alias, fileread.help.name);
    })
  })
})

client.on('error', console.error)
