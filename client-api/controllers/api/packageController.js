const { Package } = require("../../models/index");

exports.create = async (req, res) => {
  try {
    const package = await Package.create({
      name: req.body.name,
      max_device: req.body.max_device,
    });

    return res.status(200).json({
      success: true,
      message: "create package success",
      data: package,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const package = await Package.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (package) {
      return res.status(200).json({
        success: true,
        message: "get package success",
        data: package,
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
      message: "semething went wrong on the server",
    });
  }
};
