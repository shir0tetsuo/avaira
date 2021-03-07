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
  if (message.mdata.owner_id != message.author.id) status = `Owner ${owner} (Lv${message.UBIT.level}/AUTH${message.UBIT.permission})`
  if (message.mdata.owner_id == 0) status = 'Empty Node'
  if (message.mdata.owner_id == message.author.id) status = 'Owned'

  message.HUD = '';
  message.HUD += `${message.nodeColor} ${status}\n`
  message.HUD += `\`\`\`md\n`
  message.HUD += `< SILVER ${message.mdata.silver}/${message.author.silver}(you) >`
  message.HUD += ` < GOLD ${message.mdata.gold}/${message.author.gold}(you) >\n`
  message.HUD += `< owner_id ${message.mdata.owner_id} > < QUERY ${(new Date()) - message.ActionTime.getTime()}ms >\n`
  message.HUD += `< LEVEL ${UBIT.level}/${message.author.level}(you) > ${xxx}/179 ${yyy}/359 <${realLat}.00/LAT> <${realLon}.00/LON> [${realLat}.00,${realLon}.00]\n`
  message.HUD += `\`\`\``

  if (message.author.level >= UBIT.level && message.author.silver >= message.mdata.silver && message.author.gold >= message.mdata.gold) {
    message.HUD += `You may purchase this node with \`${settings.prefix}in ${message.ADDRESS} buy ${message.mdata.silver} ${message.mdata.gold}\``
  }

  const EmbedObject = {
    color: 0x59d7e8,
    title: 'Node Properties Matrix',
    author: {
      name: 'Google Location',
      icon_url: 'https://shadowsword.tk/img/google_icon_131222.png',
      url: `https://www.google.com/maps/@${realLat}.0000000,${realLon}.0000000,8.0z`
    },
    description: `Location \`${message.ADDRESS}\` ${realLat},${realLon}`,
    fields: [
      {
        name: `\u200b`,
        value: `${message.R}`
      },
      {
        name: `Displaying Query for`,
        value: `${message.HUD}`
      }
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
  description: 'Updated Inspect Utility.',
  usage: 'in [(0-179)/(0-359)], in [(0-179)/(0-359)] buy [silver] [gold]'
};
