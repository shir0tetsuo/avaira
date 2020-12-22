const settings = require('../settings.json')

// Avaira printing error response
function areact(message) {
  message.react('🖤')
  message.reply('\`inspect [(0-179)(0-360)]\` like \`inspect 124068\`')
}

// 0 padding
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

// Read Map Bit
function rMapBit(client, message, workload) {
  // Initialization Controller
  if (!message.R) message.R = '';
  if (!message.shiftdelimiter) message.shiftdelimiter = '';

  // workload = address array
  // client.map = database
  // message.R = msg response carry
  // message.ADDRESS = inspecting
  // message.shiftdelimiter = latitude address

  // BLACK = empty
  // GREEN = owned
  // ORANGE = g > current, other owner
  // PURPLE = s > current, other owner
  // BLUE = g/s < current, other owner

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
        bonhomme = ':new_moon:';
      }
      if (!bonhomme) {
        bonhomme = ':black_circle:'
      }
      message.R += `${bonhomme}\`${res.coordinate}\`,`
      rMapBit(client, message, workload)
      console.log('BIT OK',res.coordinate)
    })

  } else {
    message.reply(message.R)
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
  /*finally {
    const block = client.map.findOne({ where: {coordinate: addr } }).then(m=>{
      // final handling
      return block;
    })
  }*/
}

// Generate Map Blocks
function gMap(client, message, params, perms){
  if (!isNaN(params[0]) && params[0].length < 7 && params[0].length > 5) {

    let xxx = params[0].slice(0,3)
    let yyy = params[0].slice(3,6)

    if (xxx >= 0 && xxx < 180 && yyy >= 0 && yyy < 360) {

      message.ADDRESS = params[0]

      var xmin = parseInt(xxx) - 2,
      xmax = parseInt(xxx) + 3,
      ymin = parseInt(yyy) - 2,
      ymax = parseInt(yyy) + 3;

      if (xmin < 0) xmin = 0;
      if (xmax > 180) xmax = 180;
      if (ymin < 0) ymin = 0;
      if (ymax > 360) ymax = 360;

      var lat, lon, address, R = '';

      (async function loop() {
        for (lat = xmin; lat < xmax; lat++) {
          for (lon = ymin; lon < ymax; lon++) {
            xx = zeroPad(lat,3)
            yy = zeroPad(lon,3)
            var address = `${xx}${yy}`
            gMapBit(client, address)
          }
          // add a padding,
          // extra information for selected tgt
        }
      })().then(extended =>{
        var workload = [];
        (async function loop() {
          for (lat = xmin; lat < xmax; lat++) {
            for (lon = ymin; lon < ymax; lon++) {
              xx = zeroPad(lat,3)
              yy = zeroPad(lon,3)
              //var address = `${xx}${yy}`
              workload.push(`${xx}${yy}`)

              /*if (parseInt(address) == parseInt(params[0])) {
                // Display Extra Information
              } else {
                //rMapBit(client, message, address)
              }*/
            }
            //R += '\n'
            // padding
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
  gMap(client, message, params, perms)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['in'],
  permLevel: 4
};

exports.help = {
  name: 'inspect',
  description: 'Inspect location coordinates.',
  usage: 'inspect [(0-179)/(0-359)] (eg. inspect 127336)'
};
