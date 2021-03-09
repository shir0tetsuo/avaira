const settings = require('../settings.json');

const C = require('../sys/cartographer.js')

exports.run = (client, message, params, perms) => {
  // params 0 ADDRESS
  // params 1 ZT
  if (params[0] && params[1]) {
    C.szt(client, params[0], params[1])
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['szt'],
  permLevel: 3
};

exports.help = {
  name: 'shiftztype',
  description: 'Shift node zone ID type.',
  usage: 'szt [0=ADDR] [1=ZT]'
};
