const { OrderDetail } = require("../../models/index");

exports.createOrderDetail = async (req, res) => {
  try {
    const order = await OrderDetail.bulkCreate(req.body.insertOrderDetail);

    return res.status(200).json({
      success: true,
      message: "order detail success create",
      data: order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something when wrong on the server",
    });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const data = await OrderDetail.findAll({
      where: {
        orderId: req.params.id,
      },
    });

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "get order detail success",
        data: data,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "data not found",
        data: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};
