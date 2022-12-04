const { PhoneState } = require("../models/index");
const globalService = require("./globalService");
const { getPhoneNumber } = require("../utils/globalUtils");

exports.init = async (client, receiver, message) => {
  const phone = await getPhoneNumber(message);

  const userData = await PhoneState.findOne({
    where: {
      phone: phone,
    },
  });

  try {
    await client.sendMessage(receiver, {
      text: `Hai Kak! Selamat datang di BOT Commerce. Kami menyediakan barang-barang berkualitas, silahkan dicek pada katalog toko Kami untuk melihat produk kami.`,
    });

    if (userData) {
      userData.type_state = "!info";

      await userData.save();
    } else {
      await PhoneState.create({
        phone: phone,
        type_state: "!info",
      });
    }

    await globalService.backToMainMenu(client, receiver, message);
  } catch (err) {
    console.log(err);
  }
};
