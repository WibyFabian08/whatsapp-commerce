const { Device, PhoneState } = require("../models/index");
const { getPhoneNumber, getBotNumber } = require("../utils/globalUtils");
const axios = require("axios");

exports.initMessage = async (sock, receiver, message) => {
  // console.log(JSON.stringify(message, undefined, 2));
  try {
    const textMessage = message.messages[0].message?.conversation;
    const responseList = message.messages[0].message?.listResponseMessage;
    const responseButton = message.messages[0].message?.buttonsResponseMessage;
    const responseTemplateButton =
      message.messages[0].message?.templateButtonReplyMessage;
    const orderMessage = message.messages[0].message?.orderMessage;

    const name = message.messages[0].pushName;
    const phone = await getPhoneNumber(message);
    const botNumber = await getBotNumber(sock);
    const formatBotPhone = botNumber.replace("62", "0");
    const botDevice = await Device.findOne({
      where: {
        phone_number: formatBotPhone,
      },
      raw: true,
    });

    if (
      textMessage ||
      responseButton ||
      responseList ||
      responseTemplateButton
    ) {
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

      const headers = {
        "x-api-key": botDevice.apikey,
      };

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
      } else if (responseTemplateButton) {
        userState.state = responseTemplateButton.selectedId;
        await userState.save();
      }

      const keyword = await axios.get(
        `http://localhost:8080/api/keyword/${
          userState.state !== null ? userState.state : "welcome"
        }`,
        { headers }
      );

      if (keyword.data.data !== null) {
        await sock.sendMessage(receiver, JSON.parse(keyword.data.data.content));
      }

      if (userState.state !== null) {
        await backToMainMenu(sock, receiver, message);
      }
    }

    // handle order whatsapp
    if (orderMessage) {
      const headers = {
        "x-api-key": botDevice.apikey,
      };

      let cartData = {
        phone: phone,
        orderId: orderMessage.orderId,
        itemCount: orderMessage.itemCount,
        status: orderMessage.status,
        token: orderMessage.token,
        total: parseInt(orderMessage.totalAmount1000),
      };

      await axios.post(`http://localhost:8080/api/order/create`, cartData, {
        headers,
      });

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

      await axios.post(
        `http://localhost:8080/api/order-detail/create`,
        { insertOrderDetail },
        {
          headers,
        }
      );

      // await OrderDetail.bulkCreate(insertOrderDetail);
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
