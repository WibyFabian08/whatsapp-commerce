const orderService = require("../services/orderService");

exports.handleState = async (client, message) => {
  try {
    orderService.init(client, message.messages[0].key.remoteJid, message);
  } catch (err) {
    console.log(err);
  }
};
