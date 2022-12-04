const { Keyword } = require("../../models/index");
const { getBotNumber } = require("../../utils/globalUtils");

const whatsapp = require("../../helpers/whatsapp");

exports.create = async (req, res) => {
  try {
    const sessionName = req.session;
    const sock = await whatsapp.getSession(sessionName);

    if (sock) {
      const phone = await getBotNumber(sock);
      const data = {
        phone: phone,
        keyword: req.body.keyword,
        content: JSON.stringify(req.body.content),
        type: req.body.type,
        note: req.body.note,
      };

      const newKeyword = await Keyword.create(data);

      return res.status(200).json({
        success: true,
        message: "create keyword success",
        data: newKeyword,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "session not found",
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "something went wrong on ther server",
      data: {},
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const sessionName = req.session;
    const sock = await whatsapp.getSession(sessionName);
    const phone = await getBotNumber(sock);

    const keyword = await Keyword.findOne({
      where: {
        phone: phone,
        id: req.params.id,
      },
    });

    await keyword.destroy();

    res.status(200).json({
      success: true,
      message: "delete keyword success",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "something went wrong on ther server",
      data: {},
    });
  }
};
