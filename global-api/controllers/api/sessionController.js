const whatsapp = require("../../helpers/whatsapp");
const { Device } = require("../../models/index");

// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('rahasia');

exports.createSession = async (req, res) => {
  try {
    // const
    await whatsapp.createSession(req.headers.session, false, res, req);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.disConnectSession = async (req, res) => {
  try {
    const session = req.headers.session;
    const sessionName = req.body.sessionName;

    await whatsapp.deleteSession(sessionName, false, res);

    return res.status(200).json({
      success: true,
      message: "disconnect session success",
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const sessionName = req.headers.session;

    await whatsapp.deleteSession(sessionName, false, res);

    await Device.destroy({
      where: {
        name: sessionName,
      },
    });

    return res.status(200).json({
      success: true,
      message: "delete session success",
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const data = await Device.findAll();

    if (data) {
      // data.map(async (item) => {
      //   let session = await Device.findOne({
      //     where: {
      //       name: item.name,
      //       phone: item.phone_number,
      //     },
      //   });
      //   let isActive = whatsapp.isSessionsExists(item.name);
      //   if (isActive) {
      //     item.status = "active";
      //     session.status = "active";
      //   } else {
      //     session.status = "pending";
      //   }

      //   await session.save();
      // });
      return res.status(200).json({
        success: true,
        message: "get all session success",
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
    });
  }
};

exports.getSession = async (req, res) => {
  try {
    const data = await Device.findOne({
      where: {
        name: req.headers.session,
        phone_number: req.params.phone,
      },
    });

    if (data) {
      let isActive = whatsapp.isSessionsExists(data?.name);

      if (isActive) {
        data.status = "active";
      } else {
        data.status = "pending";
      }

      return res.status(200).json({
        success: true,
        message: "get session success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "data not found",
        data: {},
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const data = await Device.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (data) {
      let isActive = whatsapp.isSessionsExists(data?.name);

      if (isActive) {
        data.status = "active";
      } else {
        data.status = "pending";
      }

      return res.status(200).json({
        success: true,
        message: "get session success",
        data: data,
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "data not found",
        data: {},
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getSessionsStatus = async (req, res) => {
  try {
    const devices = await Device.findAll({
      raw: true,
    });

    const status = [];

    return res.status(200).json({
      success: true,
      message: "get session status success",
      data: devices,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};
