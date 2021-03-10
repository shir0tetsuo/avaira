const settings = require('../settings.json');
const C = require('../sys/cartographer.js')
const B = require('../sys/hyperbank.js')

var shop = {};

shop[15] = {
  auth: 0,
  id: 15,
  name: 'CONSTRUCT I',
  desc: 'Basic Construct Psychic Energy Node',
  commit: {
    silver: 300,
    gold: 120,
  }
}
shop[16] = {
  auth: 0,
  id: 16,
  name: 'UNKNOWN',
  desc: 'Psychic Energy Node',
  commit: {
    silver: 400,
    gold: 20,
  }
}
shop[13] = {
  auth: 1,
  id: 13,
  name: 'ASTRAL GATE',
  desc: 'Psychic Energy Gate Portal Node',
  commit: {
    silver: 90,
    gold: 100,
  }
}
shop[6] = {
  auth: 1,
  id: 6,
  name: 'CONSTRUCT II (D)',
  desc: 'Psychic Energy Construct (Defense/Ward) Node',
  commit: {
    silver: 20,
    gold: 50,
  }
}
shop[3] = {
  auth: 1,
  id: 3,
  name: 'COLLESEUM LINK II',
  desc: 'Psychic Energy Link Sparring Colleseum Node',
  commit: {
    silver: 3000,
    gold: 1000,
  }
}
shop[4] = {
  auth: 1,
  id: 4,
  name: 'COLLESEUM LINK III',
  desc: 'Psychic Energy Link Sparring Colleseum Node',
  commit: {
    silver: 4000,
    gold: 2000,
  }
}
shop[5] = {
  auth: 2,
  id: 5,
  name: 'COLLESEUM LINK IV',
  desc: 'Psychic Energy Link Sparring Colleseum Node',
  commit: {
    silver: 4000,
    gold: 4000,
  }
}
shop[2] = {
  auth: 2,
  id: 2,
  name: 'COLLESEUM LINK I',
  desc: 'Psychic Energy Link Sparring Colleseum Node',
  commit: {
    silver: 5000,
    gold: 5000,
  }
}
shop[9] = {
  auth: 3,
  id: 9,
  name: 'DARK LINK',
  desc: 'Psychic Energy Link Dark Realm Gate Node',
  commit: {
    silver: 300,
    gold: 100,
  }
}
shop[14] = {
  auth: 3,
  id: 14,
  name: 'LIGHT LINK',
  desc: 'Psychic Energy Link Light Realm Gate Node',
  commit: {
    silver: 300,
    gold: 100,
  }
}
shop[13] = {
  auth: 3,
  id: 13,
  name: 'NEUTRAL LINK',
  desc: 'Psychic Energy Link Gate Node',
  commit: {
    silver: 900,
    gold: 100,
  }
}
shop[8] = {
  auth: 4,
  id: 8,
  name: 'NITHYA LINK',
  desc: 'Psychic Energy Link Gate Node',
  commit: {
    silver: 10,
    gold: 10,
  }
}
shop[7] = {
  auth: 3,
  id: 7,
  name: 'CONSTRUCT III (H.E.C.)',
  desc: 'Psychic High Energy Construct Node',
  commit: {
    silver: 1000,
    gold: 5000,
  }
}
shop[1] = {
  auth: 1,
  id: 1,
  name: 'CITY CLAIM',
  desc: 'Build city on sovereignty.',
  commit: {
    silver: 1000,
    gold: 1400,
  }
}
shop[0] = {
  auth: 1,
  id: 0,
  name: 'DEMOLISH',
  desc: 'Remove Identity.',
  commit: {
    silver: 50,
    gold: 50,
  }
}



  async function runShop(client, message, params, perms) {
    if (!params[1]) {

      // BELOW HERE ARE LIST OF OPTIONS
      //const level = perms
      //const authList = shop.filter(obj => obj.auth <= level).keyArray()
      var output = ''
      output += `:euro:S \`${message.author.silver}\`, :yen:G \`${message.author.gold}\``
      for (i = 0; i < 20; i++) {
        if (shop[i] && shop[i].auth <= perms) {
          output += `\n\`ID ${shop[i].id} AUTH ${shop[i].auth}\` :euro:S \`${shop[i].commit.silver}\`, :yen:G \`${shop[i].commit.gold}\` **${shop[i].name}** *${shop[i].desc}*`
        } else {
          //output += `\n\`AUTH ${shop[i].auth}\` ${shop[i].name}`
        }
      }
      message.reply(output)
    } else {
      // BELOW HERE ARE ACTIONS
      if (shop[params[1]] && shop[params[1]].auth <= perms) {
        if (shop[params[1]].commit.silver <= message.author.silver && shop[params[1]].commit.gold <= message.author.gold) {
          CGold = shop[params[1]].commit.gold
          CSilver = shop[params[1]].commit.silver
          ID = shop[params[1]].id
          await B.bankSilver(client, message, -CSilver, message.author.id)
          await B.bankGold(client, message, -CGold, message.author.id)
          await C.szt(client, ADDRESS, ID)
          return message.reply(`Success! Changed to ID ${ID}`)
        } else {
          return message.reply(`you are lacking funds!`)
        }
      } else {
        return message.reply(`you don't have the authority!`)
      }
    }
  }

exports.run = async (client, message, params, perms) => {
  if (!params[0] || params[0].length != 6) return message.reply(`must specify address`)
  ADDRESS = params[0];
  if (isNaN(ADDRESS)) return message.reply(`\`Not a valid address!\``)
  BIT = await C.RMapBit(client, ADDRESS)
  if (!BIT) return message.reply(`\`Address not initialized or does not exist\``)
  if (BIT.owner_id == message.author.id) {
    runShop(client, message, params, perms)
  } else {
    message.reply(`\`UNAUTHORIZED\``)
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['id'],
  permLevel: 0
};

exports.help = {
  name: 'ident',
  description: 'Manage owned address identity.',
  usage: 'ident [ADDRESS] [OPTION]'
};
