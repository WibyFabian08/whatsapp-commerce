const { Cart } = require("../../models/index");
const whatsapp = require("../../helpers/whatsapp");

exports.getOrder = async (req, res) => {
  try {
    const sessionName = req.session;
    const sock = await whatsapp.getSession(sessionName);

    const orderData = await Cart.findOne({
      where: {
        orderId: req.body.orderId,
      },
      raw: true,
    });

    const detailOder = await sock.getOrderDetails(
      orderData.orderId,
      orderData.token
    );

    if (detailOder) {
      return res.status(200).json({
        success: true,
        message: "get order success",
        data: detailOder,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "data not found",
        data: {},
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
      data: {},
    });
  }
};
