const settings = require('../settings.json');
const chalk = require('chalk')
const B = require('../sys/hyperbank.js')
const C = require('../sys/cartographer.js')

function dummy() {
  data = {};
  data.user_id = 0;
  data.silver = 0;
  data.permission = 0;
  data.level = 0;
  return data
}

async function printUI(client, message) {
  xxx = message.ADDRESS.slice(0,3)
  yyy = message.ADDRESS.slice(3,6)
  realLat = parseInt(message.ADDRESS.slice(0,3))-90
  realLon = parseInt(message.ADDRESS.slice(3,6))-180

  status = '';
  if (message.mdata.owner_id != 0) {
    owner = await client.users.fetch(message.mdata.owner_id)
  } else {
    owner = await dummy()
  }
  if (message.mdata.owner_id != message.author.id) status = `Owner ${owner} (Lv${message.UBIT.level}/AUTH${message.UBIT.permission})\n`
  if (message.mdata.owner_id == 0) status = 'Empty Node'
  if (message.mdata.owner_id == message.author.id) status = 'Owned'

  // based on identity
  if (message.mdata.identity == '1') status += ' [CITY]'
  if (message.mdata.identity == '2') status += ' [COLLESEUM]'
  if (message.mdata.identity == '3') status += ' [COLLESEUM]'
  if (message.mdata.identity == '4') status += ' [COLLESEUM]'
  if (message.mdata.identity == '5') status += ' [COLLESEUM]'
  if (message.mdata.identity == '6') status += ' [DEFENSE CONSTRUCT]'
  if (message.mdata.identity == '7') status += ' [HI.EN. CONSTRUCT]'
  if (message.mdata.identity == '8') status += ' [Nithya II]'
  if (message.mdata.identity == '9') status += ' [Dark Realm]'
  if (message.mdata.identity == '10') status += ' [Ari\'s Realm]'
  if (message.mdata.identity == '11') status += ' [Ari\'s Realm]'
  if (message.mdata.identity == '12') status += ' [Ari\'s Realm]'
  if (message.mdata.identity == '13') status += ' [ASTRAL GATE]'
  if (message.mdata.identity == '14') status += ' [Light Realm]'
  if (message.mdata.identity == '15') status += ' [CONSTRUCT]'
  if (message.mdata.identity == '16') status += ' [UNKNOWN]'
  if (message.mdata.identity == '51') status += ' [GOV. FACILITY]'
  // based on coordinate

  // add ID
  if (message.mdata.coordinate != '0') status += `\`(${message.mdata.identity})\``

  message.HUD = '';
  message.HUD += `${message.nodeColor} ${status}\n`
  //message.HUD += `\`\`\`md\n`
  message.HUD += `\n:euro: SILVER \`${message.mdata.silver} (/${message.author.silver})\` `
  message.HUD += `:yen: GOLD \`${message.mdata.gold} (/${message.author.gold})\`\n`
  message.HUD += `:sparkles: LEVEL ${UBIT.level} (You: Lv. ${message.author.level}) `
  message.HUD += `**:regional_indicator_x: ${xxx}/179 :regional_indicator_y: ${yyy}/359**\n`
  message.HUD += `:globe_with_meridians: <${realLat}.00/LAT> <${realLon}.00/LON> **\`(${realLat}.00,${realLon}.00)\`**\n`
  message.HUD += `\`\`\`< owner_id ${message.mdata.owner_id} > < QUERY ${(new Date()) - message.ActionTime.getTime()}ms >\`\`\``
  //message.HUD += `\`\`\``
  var capHUD = '(None)'
  if (message.mdata.description != '0') {
    capHUD = `\`\`\`${message.mdata.description}\`\`\``
  }

  if (message.author.level >= UBIT.level && message.author.silver >= message.mdata.silver && message.author.gold >= message.mdata.gold) {
    message.HUD += `You may purchase this node with \`${settings.prefix}in ${message.ADDRESS} buy ${message.mdata.silver} ${message.mdata.gold}\``
  }


  var identobject = ''
  if (message.mdata.identity == '1') identobject = 'https://shadowsword.tk/img/avaira/1_city.gif'
  if (message.mdata.identity == '2') identobject = 'https://shadowsword.tk/img/avaira/2_nIV.gif'
  if (message.mdata.identity == '3') identobject = 'https://shadowsword.tk/img/avaira/3_spar.gif'
  if (message.mdata.identity == '4') identobject = 'https://shadowsword.tk/img/avaira/4_spar.gif'
  if (message.mdata.identity == '5') identobject = 'https://shadowsword.tk/img/avaira/5_spar.gif'
  if (message.mdata.identity == '6') identobject = 'https://shadowsword.tk/img/avaira/6_defconstruct.gif'
  if (message.mdata.identity == '7') identobject = 'https://shadowsword.tk/img/avaira/7_railgun.gif'
  if (message.mdata.identity == '8') identobject = 'https://shadowsword.tk/img/avaira/8_nithya.gif'
  if (message.mdata.identity == '9') identobject = 'https://shadowsword.tk/img/avaira/9_dark.gif'
  if (message.mdata.identity == '10') identobject = 'https://shadowsword.tk/img/avaira/10_arirealm.gif'
  if (message.mdata.identity == '11') identobject = 'https://shadowsword.tk/img/avaira/11_arigate.gif'
  if (message.mdata.identity == '12') identobject = 'https://shadowsword.tk/img/avaira/11_arigate.gif'
  if (message.mdata.identity == '13') identobject = 'https://shadowsword.tk/img/avaira/13_astragate.gif'
  if (message.mdata.identity == '14') identobject = 'https://shadowsword.tk/img/avaira/14_lightgate.gif'
  if (message.mdata.identity == '15') identobject = 'https://shadowsword.tk/img/avaira/15_construct.gif'
  if (message.mdata.identity == '16') identobject = 'https://shadowsword.tk/img/avaira/16_wormhole.gif'


  console.log(identobject)
  const EmbedObject = {
    color: 0x59d7e8,
    title: 'Realm Node',
    author: {
      name: 'Google Physical Location',
      icon_url: 'https://shadowsword.tk/img/google_icon_131222.png',
      url: `https://www.google.com/maps/@${realLat}.0000000,${realLon}.0000000,8.0z`
    },
    image: {
      url: `${identobject}`
    },
    description: `Location \`${message.ADDRESS}\` ${realLat},${realLon}`,
    fields: [
      {
        name: `\u200b`,
        value: `${message.R}`
      },
      {
        name: `QUERY`,
        value: `${message.HUD}`
      },
      {
        name: `DESCRIPTION`,
        value: `${capHUD}`
      },
    ],
    footer: {
      text: `sov. since ${message.mdata.updatedAt}`,
      icon_url: 'https://shadowsword.tk/img/service_icon_avaira.png'
    }
  }

  message.reply({embed: EmbedObject})
  console.log(chalk.blueBright(`Request Composed`))
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

  // workload = address array
  // message.PARAMS = raw params load
  // client.map = database
  // message.R = msg response carry
  // message.ADDRESS = inspecting
  // message.mdata = address response
  // message.shiftdelimiter = latitude address

async function bitLoop(client, message, workload) {
  // Return Setup
  if (!message.R) message.R = '';
  if (!message.shiftdelimiter) message.shiftdelimiter = '';

  if (workload.length > 0) {
    // LOAD = current address in workload
    // BIT = LOAD Data
    // UBIT = User Data
    LOAD = workload.shift()

    // Cartesian Slicing
    if (message.shiftdelimiter != LOAD.slice(0,3)) {
      message.R += '\n'
      message.shiftdelimiter = LOAD.slice(0,3)
    }

    console.log('BIT LOAD',LOAD)
    var BIT = await C.RMapBit(client, LOAD)
    UBIT = await dummy()
    if (BIT.owner_id != 0) UBIT = await B.readUser(client, BIT.owner_id)
    nodeColor = await C.getColor(client, message, BIT, UBIT)
    message.R += `${nodeColor}\`${LOAD}\``
    console.log('BIT OK',chalk.blueBright(LOAD))
    bitLoop(client, message, workload)
  } else {
    console.log(chalk.greenBright('Cleaning',message.ADDRESS,'Request'))
    var BIT = message.mdata
    UBIT = await dummy()
    message.STOP = true;
    if (BIT.owner_id != 0) UBIT = await B.readUser(client, BIT.owner_id)
    nodeColor = await C.getColor(client, message, BIT, UBIT)
    message.UBIT = UBIT;
    message.nodeColor = nodeColor
    printUI(client, message)
    // reply object with node information
    // still need bit information
  }
}

exports.run = async (client, message, params, perms) => {
  message.PARAMS = params;
  message.AUTHORITY = perms;
  message.ADDRESS = params[0];

  // return clauses
  if (!params[0]) {
    message.reply('no coordinates specified~')
    message.react('🖤')
    return
  }
  if (params[0].length != 6 || isNaN(params[0])) {
    message.reply('your address was invalid~')
    message.react('🖤')
    return
  }

  // maximums
  let xxx = params[0].slice(0,3)
  let yyy = params[0].slice(3,6)

  if (xxx < 0 || xxx > 179 || yyy < 0 || yyy > 359) {
    message.reply('Address not within limits.')
    message.react('🖤')
    return
  }

  // Read Point Data
  await C.GMapBit(client, message.ADDRESS);
  message.mdata = await C.RMapBit(client, message.ADDRESS);

  var owner_data = await dummy();

  // Buy Function
  if (params[1] && params[1].toLowerCase() == 'buy') {
    if (message.mdata.owner_id != 0) owner_data = await B.readUser(client, message.mdata.owner_id)
    if (message.author.silver < message.mdata.silver || message.author.gold < message.mdata.gold) {
      message.reply('you do not possess the necessary funds~')
      message.react('🖤')
      return
    }

    if (owner_data) {
      if (owner_data.level > message.author.level) {
        message.reply('your level is not high enough')
        message.react('🖤')
        return
      } else {
        isDone = await C.UMapBitFN(client, message, message.ADDRESS)
        if (isDone == true) {
          message.reply(`You purchased \`${message.ADDRESS}\` for ${params[2]}S, ${params[3]}G!`)
        } else {
          message.reply(`Something went wrong! Try \`${settings.prefix}in ${message.ADDRESS} ${message.mdata.silver} ${message.mdata.gold}\``)
        }
      }
    } else {
      isDone = await C.UMapBitFN(client, message, message.ADDRESS)
      if (isDone == true) {
        message.reply(`You purchased \`${message.ADDRESS}\` for ${params[2]}S, ${params[3]}G!`)
      } else {
        message.reply(`Something went wrong! Try \`${settings.prefix}in ${message.ADDRESS} ${message.mdata.silver} ${message.mdata.gold}\``)
      }
    }
    return
  }

  // Spatial Array Limits Controller
  var xmin = parseInt(xxx) - 4,
  xmax = parseInt(xxx) + 5,
  ymin = parseInt(yyy) - 2,
  ymax = parseInt(yyy) + 3; // ymin=left,ymax=right
  if (xmin < 0) xmin = 0;
  if (xmax > 180) xmax = 180;
  if (ymin < 0) ymin = 0;
  if (ymax > 360) ymax = 360;


  // Spatial Array Controller
  (async function loop() {
    for (lat = xmin; lat < xmax; lat++) {
      for (lon = ymin; lon < ymax; lon++) {
        var xx = zeroPad(lat,3)
        var yy = zeroPad(lon,3)
        var address = `${xx}${yy}`
        await C.GMapBit(client, address)
      }
    }
  })().then(ext =>{
    var workload = [];
    (async function loop() {
      for (lat = xmin; lat < xmax; lat++) {
        for (lon = ymin; lon < ymax; lon++) {
          xx = zeroPad(lat,3)
          yy = zeroPad(lon,3)
          workload.push(`${xx}${yy}`)
        }
      }
    })().then(res =>{
      bitLoop(client, message, workload)
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['cart','in'],
  permLevel: 0
};

exports.help = {
  name: 'cartographer',
  description: 'View matrix nodes.',
  usage: 'in [(0-179)/(0-359)], in [(0-179)/(0-359)] buy [silver] [gold]'
};
