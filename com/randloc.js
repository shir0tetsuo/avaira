const settings = require('../settings.json')

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.run = (client, message, params, perms) => {
  let lat = getRandomInt(179),
  lon = getRandomInt(359);
  let trueLat = lat-90,
  trueLon = lon-180;
  message.reply(`${lat}${lon} [(x/${lat}/${trueLat}.00°LAT)(y/${lon}/${trueLon}.00°LON)] ${trueLat},${trueLon}`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r','randomlocation'],
  permLevel: 0
};

exports.help = {
  name: 'randloc',
  description: 'Prints random coordinates.',
  usage: 'r'
};
