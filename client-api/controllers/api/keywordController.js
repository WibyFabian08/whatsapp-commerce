const { Keyword } = require("../../models/index");
const axios = require("axios");

exports.getKeyword = async (req, res) => {
  try {
    const deviceId = req.user;
    const keyword = await Keyword.findOne({
      where: {
        keyword: req.params.keyword,
        deviceId: parseInt(deviceId)
      }
    });

    if (keyword) {
      return res.status(200).json({
        success: true,
        message: "get keyword success",
        data: keyword,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "data not found",
        data: null
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const deviceId = req.user;

    const device = await axios.get(
      `http://localhost:8000/global/api/session/find/id/${parseInt(deviceId)}`
    );

    const checkKeyword = await Keyword.findOne({
      where: {
        keyword: req.body.keyword,
        deviceId: deviceId,
      },
    });

    if (checkKeyword) {
      return res.status(400).json({
        success: false,
        message: "keyword already used, please input another keyword",
      });
    } else {
      const keyword = await Keyword.create({
        phone: device.data.data.phone_number,
        deviceId: deviceId,
        keyword: req.body.keyword,
        content: JSON.stringify(req.body.content),
        type: req.body.type,
        note: req.body.note,
      });

      return res.status(200).json({
        success: true,
        message: "Keyword success created",
        data: keyword,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on ther server",
      data: {},
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const deviceId = req.user;

    const device = await axios.get(
      `http://localhost:8000/global/api/session/find/id/${parseInt(deviceId)}`
    );

    const keyword = await Keyword.findOne({
      where: {
        id: req.params.id,
        deviceId: deviceId,
      },
    });

    if (keyword) {
      await keyword.destroy();

      return res.status(200).json({
        success: true,
        message: "delete keyword success",
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
      message: "something went wrong on ther server",
      data: {},
    });
  }
};
