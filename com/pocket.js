const settings = require('../settings.json');
const B = require('../sys/hyperbank.js')
const P = require('../sys/pr.js')

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

async function printUI(client, message) {
  console.log('OK',message.ADDRSTR,message.author.id)
  console.log(message.BIT)

  var desc = message.BIT.description
  if (message.BIT.description == '0') desc = '(No Description)'

  desc += `\n[R${message.BIT.owner_id}-${zeroPad(message.BIT.identity,2)}-${message.BIT.address}]`
  desc += `\`\`\``

  var boolIcon = '';
  if (message.BIT.flag == true) {
    boolIcon = ':full_moon:'
  } else {
    boolIcon = ':new_moon:'
  }

  desc += `${boolIcon} Enabled: ${message.BIT.flag}`

  identobject = 'https://shadowsword.tk/img/avaira/2_nIV.gif'
  const EmbedObject = {
    color: 0x8e8e8e,
    title: 'Realm Pocket Node',
    image: {
      url: `${identobject}`
    },
    description: `${message.ADDRNC} \`${message.ADDRSTR}\``,
    fields: [
      {
        name: `\u200b`,
        value: `${message.R}`
      },
      {
        name: `\u200b`,
        value: `\`\`\`${desc}`
      }
    ]
  }

  message.reply({embed: EmbedObject})
}

async function workLoop(client, message, workload) {
  //console.log(workload, message.ADDRESS, message.ADDRSTR)
  if (!message.R) message.R = '';
  if (workload.length > 0) {
    LOAD = workload.shift()
    console.log('LOAD',LOAD)

    BIT = await P.readRealmNode(client, LOAD)

    // NC is actual
    NC = await P.getColor(client, message, BIT)

    // FC is front
    FC = NC
    if (LOAD == message.ADDRSTR) {
      FC = ':new_moon:'
      message.BIT = BIT;
      message.ADDRNC = NC
    }

    message.R += `${FC}\`${LOAD}\``

    //console.log(BIT)

    workLoop(client, message, workload)
  } else {
    printUI(client, message)
    // cleanup, print
  }
}

async function Generator(client, message, addr) {
  try {
    const block = client.pocket.create({
      address: addr,
      owner_id: message.author.id,
      flag: false,
      identity: '0',
      description: '0',
    }).catch(err=>{
      if (err.name === 'SequelizeUniqueConstraintError') {
        console.log('PSAVE',message.author.id,addr,'EXISTS')
      }
    })
    console.log('PSAVE',message.author.id,addr,'OK')
  }
  catch (e) {
    console.log(e)
  }
}

exports.run = async (client, message, params, perms) => {
  message.PARAMS = params;
  message.AUTHORITY = perms;
  //message.ADDRESS = params[0];

  if (!params[0]) {
    return message.reply(`usage: \`${settings.prefix}pocket (0-100)\``)
  }
  if (isNaN(params[0])) {
    message.reply('your address was invalid~ Must be a number between 0 - 100')
    message.react('🖤')
    return
  }

  // ADDRESS CALCULATION //
  var ADDRESS = parseInt(params[0]);
  //var message.ADDRESS = ADDRESS;

  // if (params[1] == '') {}

  // LIMITS
  var Min = 0,
  Max = 101;
  if (params[0] >= Max) ADDRESS = Max-1
  if (params[0] < Min) ADDRESS = Min

  var xMin = ADDRESS - 4,
  xMax = ADDRESS + 5;
  if (xMin < Min) xMin = Min;
  if (xMax > Max) xMax = Max;

  // PADDED ADDRESS RESULT
  var ADDRSTR = zeroPad(ADDRESS, 3);
  message.ADDRESS = ADDRESS;
  message.ADDRSTR = ADDRSTR;

  (async function loop() {
    for (lat = xMin; lat < xMax; lat++) {
      var addr = zeroPad(lat,3)
      Generator(client, message, addr)
    }
  })().then(ext =>{
    var workload = [];
    (async function loop() {
      for (lat = xMin; lat < xMax; lat++) {
        var addr = zeroPad(lat,3)
        workload.push(`${addr}`)
      }
    })().then(res =>{
      workLoop(client, message, workload)
    })
  })

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pk'],
  permLevel: 1
};

exports.help = {
  name: 'pocket',
  description: 'Pocket Realm Nodes.',
  usage: 'pocket [ADDRESS] (options)'
};
