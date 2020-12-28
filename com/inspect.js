const settings = require('../settings.json')

// https://github.com/discordjs/guide/blob/master/code-samples/sequelize/tags/sequelize.js

// Avaira printing error response
function areact(message) {
  message.react('🖤')
  message.reply('\`inspect [(0-179)(0-359)]\` like \`inspect 124068\`')
}

// 0 padding
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

// Update Map Bit and user inventory
function uMapBit(client, message) {
  //client.dbusers, client.map
  // trade math
  let thrownSilver = Math.round(message.PARAMS[2]),
  thrownGold = Math.round(message.PARAMS[3]),
  owner_id = message.coorData.owner_id,
  costSilver = Math.round(message.coorData.silver),
  costGold = Math.round(message.coorData.gold);
  newSilver = Math.round(message.author.silver - thrownSilver)
  newGold = Math.round(message.author.gold - thrownGold)
  // modify user
  const affectUser = client.dbusers.update({ silver: newSilver, gold: newGold }, { where: { user_id: message.author.id } }).then(r => {

    // give back to original owner math
    if (owner_id != 0) {
      const affectOther = client.dbusers.findOne({ where: { user_id: owner_id } }).then(ao => {
        var ns = Math.round(ao.silver + thrownSilver),
        ng = Math.round(ao.gold + thrownGold);
        const affectOther = client.dbusers.update({ silver: ns, gold: ng }, { where: {user_id: owner_id} }).catch(e => {console.log('E32')})
      }).catch(e => {console.log('E33')})
    }

    // affect map, end with purchased
    const affectMap = client.map.update({ owner_id: message.author.id, silver: thrownSilver, gold: thrownGold }, { where: { coordinate: message.ADDRESS } }).then(s => {
      console.log(`ADDRESS ${message.ADDRESS} SILVER ${costSilver} (for ${thrownSilver}/${message.author.silver}) GOLD ${costGold} (for ${thrownGold}/${message.author.gold})`)
      console.log(`=> PURCHASE ACCEPTED < QUERY ${(new Date()) - message.ActionTime.getTime()}ms > ${message.author.tag}`)
      message.react('💚')
      message.reply(`You purchased \`${message.ADDRESS}\` for ${thrownSilver} <:silver:791893131518935061>, ${thrownGold} <:gold:791893120689111090>`)
      //return
    }).catch(e => {
      console.log(e)
    })
  }).catch(e => {
    console.log(e)
  })
}

// Read Map Bit
async function rMapBit(client, message, workload) {
  // Initialization Controller
  if (!message.R) message.R = '';
  if (!message.shiftdelimiter) message.shiftdelimiter = '';

  // workload = address array
  // message.PARAMS = raw params load
  // client.map = database
  // message.R = msg response carry
  // message.ADDRESS = inspecting
  // message.coorData = address response
  // message.shiftdelimiter = latitude address

  // Workload Loop
  if (workload.length > 0) {
    bitload = workload.shift()

    // if bit not equal to slice, break up components
    if (message.shiftdelimiter != bitload.slice(0,3)) {
      message.R += '\n'
      message.shiftdelimiter = bitload.slice(0,3)
    }

    console.log('BIT LOAD',bitload)

    // Generate Component, append to R
    const tag = client.map.findOne({ where: { coordinate: bitload } }).then(res => {
      var bonhomme = '';
      if (res.coordinate == message.ADDRESS) {
        message.coorData = res;
        bonhomme = ':new_moon:';
      }
      if (!bonhomme) {
        // COLOR DATA
        bonhomme = ':black_circle:'
        if (res.owner_id == message.author.id) bonhomme = ':white_circle:'
        if (res.owner_id != 0 && res.owner_id != message.author.id) {
          bonhomme = ':yellow_circle:'
          if (res.silver > message.author.silver) bonhomme = ':purple_circle:'
          if (res.gold > message.author.gold) bonhomme = ':brown_circle:'
          if (res.gold > message.author.gold && res.silver > message.author.silver) bonhomme = ':orange_circle:'
        }
      }
      // R ///////////////////////////////////////////
      message.R += `${bonhomme}\`${res.coordinate}\``
      rMapBit(client, message, workload)
      console.log('BIT OK',res.coordinate)
    })

  } else {
    // if owner_id not blank, select owner_id from user_id in userdb
    // select data
    var bonhomme = ':black_circle',
    status = 'Empty Node'
    message.R += `\n\n`
    // SELECTED NODE COLOR DATA
    if (message.coorData.owner_id == message.author.id) bonhomme = ':white_circle:', status = 'Owned'
    if (message.coorData.owner_id == 0) bonhomme = ':black_circle:'

    // other owner header
    if (message.coorData.owner_id != 0 && message.coorData.owner_id != message.author.id) {
      bonhomme = ':yellow_circle:';
      let ownerdata = await client.users.fetch(message.coorData.owner_id)
      status = `Owner ${message.coorData.owner_id} ${ownerdata}`

      // bonhomme modifiers
      if (message.coorData.silver > message.author.silver) bonhomme = ':purple_circle:';
      if (message.coorData.gold > message.author.gold) bonhomme = ':brown_circle:';
      if (message.coorData.gold > message.author.gold && message.coorData.silver > message.author.silver) bonhomme = ':orange_circle:';
    }
    // 0 = addr, 1 = command, 2 = silver, 3 = gold
    if (message.PARAMS[1] == 'buy') {
      if (isNaN(message.PARAMS[2]) || isNaN(message.PARAMS[3])) {
        message.react('🖤')
        message.reply(`you must specify your [silver] and [gold] in numerical values.\nCommand: \`${settings.prefix}in ${message.ADDRESS} buy ${message.coorData.silver} ${message.coorData.gold}\``)
        return
      } else {
        if (message.author.silver >= message.PARAMS[2] && message.author.gold >= message.PARAMS[3]) {
          if (message.PARAMS[2] >= message.coorData.silver && message.PARAMS[3] >= message.coorData.gold) {
            console.log('TEST')
            uMapBit(client, message)
          } else {
            message.react('💛')
            message.reply(`you don't possess the funds.`)
            return
          }
        } else {
          message.react('🖤')
          message.reply(`you don't possess the funds.`)
          return
        }
        return
      }
    } else {
      message.HUD = '';
      message.HUD += `${bonhomme}\`${message.ADDRESS}\` ${status}`
      message.HUD += `\`\`\`md\n`
      message.HUD += `< SILVER ${message.coorData.silver}/${message.author.silver}(you) >`
      message.HUD += ` < GOLD ${message.coorData.gold}/${message.author.gold}(you) >\n`
      message.HUD += `< owner_id ${message.coorData.owner_id} > < QUERY ${(new Date()) - message.ActionTime.getTime()}ms >\n`
      //message.HUD += `> sov. since ${message.coorData.updatedAt} \n`
      realLat = parseInt(message.ADDRESS.slice(0,3))-90
      realLon = parseInt(message.ADDRESS.slice(3,6))-180
      message.HUD += `${message.ADDRESS.slice(0,3)}/179 ${message.ADDRESS.slice(3,6)}/359 <${realLat}.00/LAT> <${realLon}.00/LON> [${realLat}.00,${realLon}.00]`
      message.HUD += `\`\`\``
      if (message.coorData.silver <= message.author.silver && message.coorData.gold <= message.author.gold) {
        message.HUD += `You may purchase this node with \`${settings.prefix}in ${message.ADDRESS} buy [silver] [gold]\``
      }

      //if () actualtag = client.users.fetch(id)
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
          text: `sov. since ${message.coorData.updatedAt}`,
          icon_url: 'https://shadowsword.tk/img/service_icon_avaira.png'
        }
      }
      message.reply({embed: EmbedObject})
    }
    // Terminate and Print R, print bit data from bitdata
  }

}

// Generate Single Map Block
function gMapBit(client, addr) {
  try {
    const block = client.map.create({
      coordinate: addr,
      owner_id: 0,
      silver: 1,
      gold: 0,
    }).catch(err=>{
      if (err.name === 'SequelizeUniqueConstraintError') {
        console.log('SAVE',addr,'EXISTS')
      }
    })
    console.log('SAVE',addr,'OK')
  }
  catch (e) {
    console.log(e)
  }
}

// Generate Map Blocks
function gMap(client, message, params, perms){
  // Filter
  if (!isNaN(params[0]) && params[0].length < 7 && params[0].length > 5) {
    let xxx = params[0].slice(0,3)
    let yyy = params[0].slice(3,6)
    if (xxx >= 0 && xxx < 180 && yyy >= 0 && yyy < 360) {


      // Spatial Array Limits Controller
      var xmin = parseInt(xxx) - 4,
      xmax = parseInt(xxx) + 5,
      ymin = parseInt(yyy) - 2,
      ymax = parseInt(yyy) + 3; // ymin=left,ymax=right
      if (xmin < 0) xmin = 0;
      if (xmax > 180) xmax = 180;
      if (ymin < 0) ymin = 0;
      if (ymax > 360) ymax = 360;
      var lat, lon, address, R = '';

      // Spatial Array Controller
      (async function loop() {
        for (lat = xmin; lat < xmax; lat++) {
          for (lon = ymin; lon < ymax; lon++) {
            xx = zeroPad(lat,3)
            yy = zeroPad(lon,3)
            var address = `${xx}${yy}`

            // Generate block in database if not exists
            gMapBit(client, address)
          }
          // add a padding,
          // extra information for selected tgt
        }
      })().then(extended =>{
        // Workload Array Controller
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
          rMapBit(client, message, workload)
        });
      });

      // for -> address -> gmapbit
      //gMapBit(client, params[0])
      //console.log('OK',xxx,yyy,block.coordinate,block.owner_id,block.silver,block.gold)
    } else {
      areact(message)
    }
  } else {
    areact(message)
  }
}

exports.run = (client, message, params, perms) => {
  message.ADDRESS = params[0]
  message.PARAMS = params
  gMap(client, message, params, perms)
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['ins'],
  permLevel: 0
};

exports.help = {
  name: 'inspect',
  description: 'Inspect location coordinates.',
  usage: 'inspect [(0-179)/(0-359)], in [address] buy [silver] [gold]'
};
