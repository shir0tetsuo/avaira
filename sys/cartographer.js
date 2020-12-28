const chalk = require('chalk')
const settings = require('../settings.json')
const B = require('./hyperbank.js')

async function uBitData(client, message, tS, tG) {
  await client.map.update({ owner_id: message.author.id, silver: tS, gold: tG}, { where: { coordinate: message.ADDRESS }})
  message.react('💚')
}

exports.xBitEditor = async (client, message, params) => {
  await client.map.update({ owner_id: params[1], silver: params[2], gold: params[3] },{ where: { coordinate: params[0] }})
  message.react('💚')
}

async function returnWorkload(client, message) {
  if (!message.PARAMS) return console.log('Workload Error')
}

exports.getColor = async (client, message, BIT, UBIT) => {
  result = ':red_square:'
  if (BIT.owner_id == 0) {
    result = ':black_circle:'
  } else if (UBIT && BIT) {
    result = ':white_circle:'
    //if (BIT.gold > 1) result = ':green_circle:'
    if (UBIT.level > message.author.level) result = ':blue_circle:'
    if (BIT.silver > message.author.silver) result = ':purple_circle:'
    if (BIT.gold > message.author.gold) result = ':brown_circle:'
    if (BIT.silver > message.author.silver && BIT.gold > message.author.gold) result = ':orange_circle:'
    if (UBIT.permission > 2) result = ':nazar_amulet:'
    if (BIT.owner_id == message.author.id) result = ':coin:'
  }
  if (BIT.coordinate == message.ADDRESS && !message.STOP) result = ':new_moon:'
  return result
}

////////////////////////////////////////////////////////////////////////////////
// BIT READERS
// CREATE
exports.GMapBit = async (client, addr) => {
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

// READ
exports.RMapBit = async (client, addr) => {
  return bit = await client.map.findOne({ where: {coordinate: addr}})
}

// UPDATE @inspect
// Returns true or false
exports.UMapBitFN = async (client, message, addr) => {
  // message.params
  // message.mdata <= data from bit
  // message.silver message.gold
  // client db's

  // mdata is bit data
  if (!message.mdata) return false;

  // Throw is less than inventory
  if (message.author.silver < message.PARAMS[2] || message.author.gold < message.PARAMS[3]) return false;
  // Throw is less than requirement
  if (message.PARAMS[2] < message.mdata.silver || message.PARAMS[3] < message.mdata.gold) return false;

  // Cost Math
  let thrownSilver = Math.round(message.PARAMS[2]),
  thrownGold = Math.round(message.PARAMS[3]),
  owner_id = message.mdata.owner_id,
  costSilver = Math.round(message.mdata.silver),
  costGold = Math.round(message.mdata.gold);
  // result
  newSilver = Math.round(message.author.silver - thrownSilver);
  newGold = Math.round(message.author.gold - thrownGold);

  // Do not process if
  if (newSilver < 0) return false;
  if (newGold < 0) return false;

  // pay original owner
  if (message.mdata.owner_id != 0) {
    B.bankSilver(client, message, thrownSilver, owner_id)
    B.bankGold(client, message, thrownGold, owner_id)
  }

  // charge new owner
  // reverse integer
  reverseSilver = parseInt(thrownSilver * -1);
  reverseGold = parseInt(thrownGold * -1);
  //console.log('COST SILVER',reverseSilver,'COST GOLD',reverseGold,costGold)
  B.bankSilver(client, message, reverseSilver, message.author.id);
  B.bankGold(client, message, reverseGold, message.author.id);

  // update map data
  uBitData(client, message, thrownSilver, thrownGold)

  return true;
}

// DELETE
////////////////////////////////////////////////////////////////////////////////
