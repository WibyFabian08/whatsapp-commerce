const { PhoneState, Cart } = require("../models/index");
const globalService = require("./globalService");
const { getPhoneNumber } = require("../utils/globalUtils");
const { formatPrice } = require("../utils/commons");

exports.init = async (client, receiver, message) => {
  const phone = await getPhoneNumber(message);
  const userData = await PhoneState.findOne({
    where: {
      phone: phone,
    },
  });

  try {
    const sections = [
      {
        title: "Pilihan Menu",
        rows: [
          {
            title: "Cek Status Order",
            rowId: "order-status",
            description: "Lihat status order berdasar order ID anda",
          },
          {
            title: "List Order",
            rowId: "order-list",
            description: "List seluruh orderan",
          },
        ],
      },
    ];

    const listMessage = {
      text: "Order Menu",
      footer: "www.me-tech.id",
      title: "Silahkan pilih menu untuk melihat orderan anda",
      buttonText: "Pilih Menu",
      sections,
    };

    await client.sendMessage(receiver, listMessage);

    if (userData) {
      userData.type_state = "!check-transaction";

      await userData.save();
    } else {
      await PhoneState.create({
        phone: phone,
        type_state: "!check-transaction",
      });
    }

    await globalService.backToMainMenu(client, receiver, message);
  } catch (err) {
    console.log(err);
  }
};

exports.checkOrder = async (client, receiver, message) => {
  try {
    await client.sendMessage(receiver, {
      text: "Silahkan masukan order id orderan anda untuk melihat status orderan!",
    });
    await globalService.backToMainMenu(client, receiver, message);

    const phone = await getPhoneNumber(message);
    const userData = await PhoneState.findOne({
      where: {
        phone: phone,
      },
    });

    userData.state = "input-order-id";
    await userData.save();
  } catch (err) {
    console.log(err);
  }
};

exports.getOrderStatus = async (client, receiver, message) => {
  try {
    const orderId = message.messages[0].message.conversation;
    const dataCart = await Cart.findOne({
      where: {
        orderId: orderId,
      },
      raw: true,
    });
    if (dataCart) {
      const detailOrder = await client.getOrderDetails(
        dataCart.orderId,
        dataCart.token
      );

      let orderData = ``;
      orderData += `Detail orderan anda :\n*Status orderan : ${dataCart.status}*\n`;
      detailOrder.products.map((data) => {
        orderData += `*${data.quantity} buah ${data.name}* \n`;
      });
      orderData += `\n*Total harga : Rp. ${formatPrice(
        detailOrder.price.total
      )}*`;

      await client.sendMessage(receiver, {
        text: orderData,
      });
      await globalService.backToMainMenu(client, receiver, message);

      const phone = await getPhoneNumber(message);
      const userData = await PhoneState.findOne({
        where: {
          phone: phone,
        },
      });

      userData.state = "get-status-order";
      await userData.save();
    } else {
      await client.sendMessage(receiver, {
        text: "Order Id yang anda masukan salah silahkan masukan ulang order id anda",
      });
      await globalService.backToMainMenu(client, receiver, message);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getAllOrder = async (client, receiver, message) => {
  const phone = await getPhoneNumber(message);
  const dataCart = await Cart.findAll({
    where: {
      phone: phone,
    },
    raw: true,
  });

  let orderData = ``;
  orderData += `List Seluruh Orderan :\n\n`;
  dataCart.map((data) => {
    orderData += `*Status Orderan : ${data.status}*\n*Order Id : ${
      data.orderId
    }* \n*Item Order : ${data.itemCount} buah*\n*Total : Rp. ${formatPrice(
      data.total
    )}*\n\n`;
  });

  await client.sendMessage(receiver, {
    text: orderData,
  });
  await globalService.backToMainMenu(client, receiver, message);
};
