const orderBotController = require("./orderBotController");
const checkOrderBotController = require("./checkOrderBotController");
const infoBotController = require("./infoBotController");

const {getPhoneNumber} = require("../utils/globalUtils");
const globalService = require("../services/globalService")

const { PhoneState, Cart, OrderDetail } = require("../models/index");

let userData = null;

exports.initMessage = async (sock, receiver, message) => {
  // console.log(JSON.stringify(message, undefined, 2));
  try {
    const textMessage = message.messages[0].message.conversation;
    const responseList = message.messages[0].message.listResponseMessage;
    const responseButton = message.messages[0].message.buttonsResponseMessage;
    const orderMessage = message.messages[0].message.orderMessage;
    const name = message.messages[0].pushName;
    const phone = await getPhoneNumber(message)

    userData = await PhoneState.findOne({
      where: {
        phone: phone,
      },
    });

    if(responseButton && responseButton.selectedButtonId === "main-menu") {
      userData.type_state = null;
      userData.state = null;

      await userData.save();
    }

    message.phone = phone;
    if (textMessage || responseList || responseButton) {
      if (userData !== null && userData.type_state !== null) {
        switch (userData.type_state) {
          case "!catalog":
            await orderBotController.handleState(sock, message);
            break;
          case "!check-transaction":
            await checkOrderBotController.handleState(sock, message);
            break;
          case "!info":
            await infoBotController.handleState(sock, message);
            break;
          default:
            await initGreeting(sock, receiver, name);
            break;
        }
      } else {
        switch (
          message.messages[0].message?.buttonsResponseMessage?.selectedButtonId
        ) {
          case "!catalog":
            await orderBotController.handleState(sock, message);
            break;
          case "!check-transaction":
            await checkOrderBotController.handleState(sock, message);
            break;
          case "!info":
            await infoBotController.handleState(sock, message);
            break;
          default:
            await initGreeting(sock, receiver, name);
            break;
        }
      }
    }

    if (orderMessage) {
      await Cart.create({
        phone: phone,
        orderId: orderMessage.orderId,
        itemCount: orderMessage.itemCount,
        status: orderMessage.status,
        token: orderMessage.token,
        total: orderMessage.totalAmount1000,
      });

      const dataOrder = await sock.getOrderDetails(
        orderMessage.orderId,
        orderMessage.token
      );

      let orders = [];

      dataOrder.products.map((data) => {
        orders.push({
          total: dataOrder.price.total,
          orderId: orderMessage.orderId,
          productId: data.id,
          quantity: data.quantity,
        });
      });

      await OrderDetail.bulkCreate(orders);
      await sock.sendMessage(receiver, {
        text: `Orderan dengan id *${orderMessage.orderId}* berhasil.\nTerimakasih sudah memesan di toko kami, orderan anda akan segera di proses 😊`,
      });
      await globalService.backToMainMenu(sock, receiver, message)
    }
  } catch (err) {
    console.log(err);
  }
};

async function initGreeting(client, receiver, name) {
  const buttons = [
    {
      buttonId: "!catalog",
      buttonText: { displayText: "Lihat Katalog" },
      type: 1,
    },
    {
      buttonId: "!check-transaction",
      buttonText: { displayText: "Cek Transaksi" },
      type: 1,
    },
    {
      buttonId: "!info",
      buttonText: { displayText: "Bantuan dan Informasi" },
      type: 1,
    },
  ];

  const buttonMessage = {
    image: { url: "https://storage.pasteurtrans.id/images/pasteur.jpg" },
    caption: `Halo kak ${name},\n\nSelamat datang di BOT WhatsApp Market Place. Nikmati kemudahan layanan belanja online langsung dari aplikasi WhatsApp di genggaman! 😊\n\nAda yang bisa kami bantu, Kak?`,
    footer: "www.me-tech.id",
    buttons: buttons,
    headerType: 4,
  };

  await client.sendMessage(receiver, buttonMessage);
}
