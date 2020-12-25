const settings = require('../settings.json')

const moment = require('moment')

// https://github.com/NebulousLabs/Discord-Bot/blob/master/src/commands/misc/UserStats.ts

exports.run = (client, message, params, perms) => {
  guildMember = message.mentions.members.first();
  if (!guildMember)
  joinDiscord = moment(guildMember.user.createdAt).format('lll') + '\n*' + moment(new Date()).diff(guildMember.user.createdAt, 'days') + ' days ago*';
  joinServer = moment(guildMember.joinedAt).format('lll') + '\n*' + moment(new Date()).diff(guildMember.joinedAt, 'days') + ' days ago*';

  message.reply(`\n\`Joined Discord\` ${joinDiscord}\n\`Joined Server\` ${joinServer}`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['u','userstats'],
  permLevel: 1
};

exports.help = {
  name: 'ustats',
  description: 'Display information on when the user joined the server and Discord.',
  usage: 'u @mention'
};
