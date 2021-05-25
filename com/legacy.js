const settings = require('../settings.json');
const B = require('../sys/hyperbank.js')

async function setEmail(client, user_id, email_addr) {
  client.dbusers.update({ portalemail: email_addr, portalhash: 'REGISTER' },{ where: { user_id: user_id }})
  console.log('legacy set success',email_addr)
}

exports.run = async (client, message, params, perms) => {
  if (!params[0]) return message.reply('cannot enter nothing. Please enter your email address. \`..legacy email@email.com\`');
  var email_addr = params[0].toLowerCase();
  if (/...*@..*\..*$/.test(email_addr) == false) return message.reply('The email address was deemed invalid by the system.');
  user = await B.readUser(client, message.author.id)
  if (!user) return message.reply('\`System Error\`')
  if (user.portalemail != 0) {
    const set = await setEmail(client, user.user_id, email_addr)
    message.reply(`Your public facing email is now: \`${email_addr}\`\nPlease use this to continue registration @ https://realmdex.shadowsword.tk/auth`)
  } else {
    const set = await setEmail(client, user.user_id, email_addr)
    message.reply(`OK - You have set your legacy email to: \`${email_addr}\`\nPlease use this to continue registration @ https://realmdex.shadowsword.tk/auth`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['oauth2'],
  permLevel: 0
};

exports.help = {
  name: 'legacy',
  description: 'Register an email to your account.',
  usage: 'legacy [email@email.com]'
};
