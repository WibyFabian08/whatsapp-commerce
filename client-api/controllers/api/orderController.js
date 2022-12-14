const { Order } = require("../../models/index");
const whatsapp = require("../../helpers/whatsapp");

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      phone: req.body.phone,
      orderId: req.body.orderId,
      itemCount: req.body.itemCount,
      status: req.body.status,
      token: req.body.token,
      total: req.body.total,
    });

    return res.status(200).json({
      success: true,
      message: "order success",
      data: order,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something when wrong on the server",
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const data = await Order.findAll();

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "get orders success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "data not found",
        data: [],
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
