const { PhoneState } = require("../models/index");
const globalService = require("./globalService")
const {getPhoneNumber, getBotNumber} = require("../utils/globalUtils")

exports.init = async (client, receiver, message) => {
  const botNumber = await getBotNumber(client)
  const phone = await getPhoneNumber(message)

  const userData = await PhoneState.findOne({
    where: {
      phone: phone,
    },
  });

  try {
    await client.sendMessage(receiver, {
      text: `Halo selamat datang di toko kami\nSilahkan buka tautan dibawah untuk melihat katalog kami di WhatsApp 😊:\n https://wa.me/c/${botNumber}`,
    });

    if (userData) {
      userData.type_state = "!catalog";

      await userData.save();
    } else {
      await PhoneState.create({
        phone: phone,
        type_state: "!catalog",
      });
    }

    await globalService.backToMainMenu(client, receiver, message);
  } catch (err) {
    console.log(err);
  }
};


