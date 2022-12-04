const orderCheckService = require("../services/orderCheckService");
const { PhoneState } = require("../models/index");
const { getPhoneNumber } = require("../utils/globalUtils");

exports.handleState = async (client, message) => {
  const textMessage = message.messages[0].message.conversation;
  const responseList = message.messages[0].message.listResponseMessage;
  const responseButton = message.messages[0].message.buttonsResponseMessage;
  const phone = await getPhoneNumber(message);
  const userData = await PhoneState.findOne({
    where: {
      phone: phone,
    },
  });

  if (textMessage || responseList || responseButton) {
    if (userData !== null && userData.type_state !== null) {
      if (responseList?.singleSelectReply?.selectedRowId) {
        userData.state = responseList?.singleSelectReply?.selectedRowId;
        await userData.save();
      }
    }
  }

  try {
    switch (userData.state) {
      case "order-status":
        await orderCheckService.checkOrder(
          client,
          message.messages[0].key.remoteJid,
          message
        );
        break;
      case "order-list":
        await orderCheckService.getAllOrder(
          client,
          message.messages[0].key.remoteJid,
          message
        );
        break;
      case "input-order-id":
        await orderCheckService.getOrderStatus(
          client,
          message.messages[0].key.remoteJid,
          message
        );
        break;
      default:
        orderCheckService.init(
          client,
          message.messages[0].key.remoteJid,
          message
        );
        break;
    }
  } catch (err) {
    console.log(err);
  }
};
