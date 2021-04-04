//pocket realm script
exports.readRealmNode = async (client, addr) => {
  return bit = await client.pocket.findOne({ where: {address: addr}})
}

exports.getColor = async(client, message, bit) => {
  result = ':red_square:'
  if (BIT.flag == true) {
    if (BIT.identity == '0') result = ':coin:' // owned
    if (BIT.identity == '1') result = ':pound:' // dark
    if (BIT.identity == '2') result = ':dollar:' // neutral
    if (BIT.identity == '3') result = ':yen:' // light
    if (BIT.identity == '4') result = ':euro:' // Nithya
    if (BIT.identity == '5') result = ':shinto_shrine:' // Other
    if (BIT.identity == '6') result = ':radioactive:' // H.E.C.
    if (BIT.identity == '7') result = ':gear:' // construct
    if (BIT.identity == '8') result = ':stadium:' // arena
  } else {
    result = ':black_circle:'
  }
  return result
}
