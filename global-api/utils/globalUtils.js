exports.getPhoneNumber = async (message) => {
  const phone = message.messages[0].key.remoteJid.replace(
    "@s.whatsapp.net",
    ""
  );
  return phone;
};

exports.getBotNumber = async (sock) => {
  let botNumber = sock.user.id.split(":");
  botNumber = botNumber[0];

  return botNumber;
};
