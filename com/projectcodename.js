//const sql = require("sqlite");
//const sqlf = require('../gsn.sqlite')
const settings = require('../settings.json');
const chalk = require ('chalk');

var attributes = [
	// Metal
	"steel", "iron", "metal", "oxidized", "aluminum", "tin", "silver", "gold", "bronze",
	// Environ
	"desert", "system", "foreign", "tundra", "mountain", "space", "field", "urban", "standalone", "nightfall", "etheric", "ethereal", "astral",
	// Stealth and cunning
	"hidden", "covert", "uncanny", "scheming", "decisive", "untouchable", "stalking", "invisible",
	// Volitility
	"rowdy", "dangerous", "explosive", "threatening", "warring", "deadly", "killer", "insane", "super", "wild", "psionic", "psychic",
	// Needs correction
	"bad", "unnecessary", "unknown", "unexpected", "waning", "future", "damaged",
	// Organic Gems and materials
	"amber", "bone", "coral", "ivory", "jet", "nacre", "pearl", "obsidian", "glass", "energetic", "energy", "fragile",
	// Regular Gems
	"agate", "beryl", "diamond", "opal", "ruby", "onyx", "sapphire", "emerald", "jade", "turquoise", "tourmaline", "quartz",
	// Colors
	"red", "orange", "yellow", "green", "blue", "violet", "brown", "aqua", "indigo", "lime", "prismatic",
	// Unsorted
	"draconic", "wireless", "spinning", "falling", "absorbing", "deadly", "death", "orbiting", "hunting", "chasing", "radionic",
	"radioactive", "searching", "revealing", "flying", "destroyed", "inconceivable", "tarnished"
]

var objects = [
	// Large cats
	"panther", "wildcat", "tiger", "lion", "cheetah", "cougar", "leopard",
	// Snakes
	"viper", "cottonmouth", "python", "boa", "sidewinder", "cobra",
	// Other animals
	"turtle", "tortoise", "cat", "feline",
	// Other predators
	"grizzly", "jackal", "falcon", "fox",
	// Prey
	"wildebeest", "gazelle", "zebra", "elk", "moose", "deer", "stag", "pony", "koala", "sloth", "bison", "beaver",
	// HORSES!
	"horse", "stallion", "foal", "colt", "mare", "yearling", "filly", "gelding",
	// Mythical creatures
	"mermaid", "unicorn", "fairy", "troll", "yeti", "pegasus", "griffin", "dragon",
	// Occupations
	"nomad", "wizard", "cleric", "pilot", "captain", "commander", "general", "major", "admiral", "chef", "inspector",
	// Technology
	"mainframe", "device", "motherboard", "network", "transistor", "packet", "robot", "android", "cyborg", "display", "battery", "memory", "disk", "cartridge", "tape", "camera", "projector", "matrix", "complex",
	// Sea life
	"octopus", "marine", "lobster", "crab", "barnacle", "hammerhead", "orca", "piranha", "fugu",
	// Weather
	"storm", "thunder", "lightning", "rain", "hail", "sun", "drought", "snow", "drizzle", "star", "moon", "meteor",
	// Musical
	"piano", "keyboard", "guitar", "trumpet", "trombone", "flute", "cornet", "horn", "tuba", "clarinet", "saxophone", "piccolo", "violin", "harp", "cello", "drum", "organ", "banjo", "rhythm", "beat", "sound", "song",
	// Tools
	"screwdiver", "sander", "lathe", "mill", "welder", "mask", "hammer", "drill", "compressor", "wrench", "mixer", "router", "vacuum",
	// Other
	"warning", "presence", "weapon", "player", "ink", "case", "cup", "chain", "door", "bones", "vision"
]

function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}

exports.run = (client, message, params) => {
  let output = '';
  if (params[0] === "pr") {
    output += `project `
  } else if (params[0] === "op") {
    output += `operation `
  }
  output += `**${Rand(attributes)} ${Rand(objects)}**`
  //output += `\n\`Modified from projectcodename.com\``
  message.channel.send(`${output.toUpperCase()}\n\`Modified from projectcodename.com\`\nSelf-Destructing in 30 Seconds.`).then(m => {
		setTimeout(() => {
			m.delete()
		}, 30000)
	})
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pc'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'projectcodename',
  description: 'Generates a codename to use.',
  usage: 'projectcodename [pr/op]'
};
