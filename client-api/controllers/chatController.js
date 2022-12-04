const { Keyword, PhoneState, Cart, OrderDetail } = require("../models/index");
const { getPhoneNumber, getBotNumber } = require("../utils/globalUtils");

const whatsapp = require("../helpers/whatsapp");

exports.initMessage = async (sock, receiver, message) => {
  // console.log(JSON.stringify(orderMessage, undefined, 2));
  try {
    const textMessage = message.messages[0].message?.conversation;
    const responseList = message.messages[0].message?.listResponseMessage;
    const responseButton = message.messages[0].message?.buttonsResponseMessage;
    const orderMessage = message.messages[0].message?.orderMessage;
    const name = message.messages[0].pushName;
    const phone = await getPhoneNumber(message);
    const botNumber = await getBotNumber(sock);

    if (textMessage || responseButton || responseList) {
      let checkUser = await PhoneState.findOne({
        where: {
          phone: phone,
        },
      });

      if (!checkUser) {
        await PhoneState.create({
          phone: phone,
          state: null,
        });
      }

      let userState = await PhoneState.findOne({
        where: {
          phone: phone,
        },
      });

      if (responseButton) {
        if (responseButton.selectedButtonId === "main-menu") {
          userState.state = null;
        } else {
          userState.state = responseButton.selectedButtonId;
        }
        await userState.save();
      } else if (responseList) {
        userState.state = responseList.singleSelectReply.selectedRowId;
        await userState.save();
      }

      const keyword = await Keyword.findOne({
        where: {
          keyword: userState.state !== null ? userState.state : "welcome",
          phone: botNumber,
        },
      });

      if (keyword) {
        await sock.sendMessage(receiver, JSON.parse(keyword.content));
      } else {
        await stateNotFound(sock, receiver, message);
      }

      if (userState.state !== null) {
        await backToMainMenu(sock, receiver, message);
      }
    }

    // handle order whatsapp
    if (orderMessage) {
      let cartData = {
        phone: phone,
        orderId: orderMessage.orderId,
        itemCount: orderMessage.itemCount,
        status: orderMessage.status,
        token: orderMessage.token,
        total: orderMessage.totalAmount1000,
      };

      await Cart.create(cartData);

      let orderDetails = await sock.getOrderDetails(
        orderMessage.orderId,
        orderMessage.token
      );

      let insertOrderDetail = [];
      orderDetails.products.map((data) => {
        insertOrderDetail.push({
          orderId: orderMessage.orderId,
          total: orderDetails.price.total,
          productId: data.id,
          productName: data.name,
          quantity: data.quantity,
        });
      });

      await OrderDetail.bulkCreate(insertOrderDetail);
    }
  } catch (err) {
    console.log(err);
  }
};

async function backToMainMenu(client, receiver, message) {
  const phone = await getPhoneNumber(message);
  try {
    const buttons = [
      {
        buttonId: "main-menu",
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

    const userData = await PhoneState.findOne({
      where: {
        phone: phone,
      },
    });

    userData.type_state = null;
    await userData.save();
  } catch (err) {
    console.log(err);
  }
}

async function stateNotFound(client, receiver, message) {
  await client.sendMessage(receiver, {
    text: "Upss pilihan yang anda pilih sepertnya belum tersedia, silihakan pilih menu lain 😊",
  });
}
