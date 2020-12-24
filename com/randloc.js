const settings = require('../settings.json')

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.run = (client, message, params, perms) => {
  let lat = zeroPad(getRandomInt(179),3),
  lon = zeroPad(getRandomInt(359),3);
  let trueLat = lat-90,
  trueLon = lon-180;
  message.reply(`${lat}${lon} [(x/${lat}/${trueLat}.00°LAT)(y/${lon}/${trueLon}.00°LON)] ${trueLat},${trueLon}\nhttps://www.google.com/maps/@${trueLat}.0000000,${trueLon}.0000000,8.0z`)
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
