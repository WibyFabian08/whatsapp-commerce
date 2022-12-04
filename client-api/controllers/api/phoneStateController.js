const { PhoneState } = require("../../models/index");

exports.getPhoneState = async (req, res) => {
  try {
    const state = await PhoneState.findOne({
      where: {
        phone: req.params.phone,
      },
    });

    if (state) {
      return res.status(200).json({
        success: true,
        message: "get phone state success",
        data: state,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "phone state not found",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const checkState = await PhoneState.findOne({
      where: {
        phone: req.body.phone,
      },
    });

    if (checkState) {
      return res.status(400).json({
        success: false,
        message: "phone number already created in state",
      });
    } else {
      const state = await PhoneState.create({
        phone: req.body.phone,
        type_state: req.body.type_state || null,
        state: req.body.state,
      });
      return res.status(200).json({
        success: true,
        message: "create phone state success",
        data: state,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "somthing went wrong on the server",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const checkState = await PhoneState.findOne({
      where: {
        phone: req.params.phone,
      },
    });

    if (checkState) {
      checkState.state = req.body.state;

      await checkState.save();

      return res.status(200).json({
        success: true,
        message: "update phone state success",
        data: checkState,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "data not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "somthing went wrong on the server",
    });
  }
};
