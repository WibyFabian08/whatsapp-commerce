const infoService = require("../services/infoService")

exports.handleState = async (client, message) => {
  try {
    infoService.init(client, message.messages[0].key.remoteJid, message);
  } catch (err) {
    console.log(err);
  }
};
