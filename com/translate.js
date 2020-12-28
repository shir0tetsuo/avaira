function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

exports.run = (client, message, params, perms) => {
  let ErrReply = `Sorry, I can't see your coordinates. Please enter like \`45,-75\``
  if (!params[0]) return message.reply(ErrReply)
  let coordinates = params[0].split(',');
  if (!coordinates[1]) return message.reply(ErrReply)
  let lat = Math.round(coordinates[0]);
  let lon = Math.round(coordinates[1]);
  let xxx = zeroPad(lat + 90,3);
  let yyy = zeroPad(lon + 180,3);
  if (!isNaN(lat) && !isNaN(lon)) {
    message.reply(`\`${xxx}${yyy}\``)
  } else return message.reply(ErrReply)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['t','tr'],
  permLevel: 0
};

exports.help = {
  name: 'translate',
  description: 'Translate real-world coordinates to matrix.',
  usage: 't [coordinates]'
};
