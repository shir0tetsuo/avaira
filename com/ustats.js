const settings = require('../settings.json')

const moment = require('moment')

// https://github.com/NebulousLabs/Discord-Bot/blob/master/src/commands/misc/UserStats.ts

exports.run = (client, message, params, perms) => {
  user = message.mentions.users.first();
  guildMember = message.mentions.members.first();
  if (!guildMember) return;
  joinDiscord = moment(guildMember.user.createdAt).format('lll') + '\n*' + moment(new Date()).diff(guildMember.user.createdAt, 'days') + ' days ago*';
  joinServer = moment(guildMember.joinedAt).format('lll') + '\n*' + moment(new Date()).diff(guildMember.joinedAt, 'days') + ' days ago*';
  const EmbedObject = {
    color: 0xd19130,
    title: 'User Stats',
    fields: [
      {
        name: `\u200b`,
        value: `${user}\n\`Joined Discord\` ${joinDiscord}\n\`Joined Server\` ${joinServer}`
      },
    ],
    thumbnail: {
      url: 'https://shadowsword.tk/img/service_icon_avaira.png'
    },
    footer: {
      text: `${new Date()}`
    }
  }
  message.reply({embed: EmbedObject})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['u','userstats'],
  permLevel: 0
};

exports.help = {
  name: 'ustats',
  description: 'Display information on when the user joined the server and Discord.',
  usage: 'u @mention'
};
