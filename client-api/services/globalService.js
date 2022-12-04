const { PhoneState } = require("../models/index");

exports.backToMainMenu = async (client, receiver, message) => {
  const phone = message.messages[0].key.remoteJid.replace(
    "@s.whatsapp.net",
    ""
  );

  try {
    const buttons = [
      {
        buttonId: "",
        buttonText: { displayText: "Kembali Ke Menu Utama" },
        type: 1,
      },
    ];

    const buttonMessage = {
      text: "Jika anda ingin kembali ke menu utama silahkan klik tombol dibawah 😊",
      footer: "www.me-tech.id",
      buttons: buttons,
      headerType: 1,
    };

    await client.sendMessage(receiver, buttonMessage);

    // const userData = await PhoneState.findOne({
    //   where: {
    //     phone: phone,
    //   },
    // });

    // userData.type_state = null;
    // await userData.save();
  } catch (err) {
    console.log(err);
  }
};
