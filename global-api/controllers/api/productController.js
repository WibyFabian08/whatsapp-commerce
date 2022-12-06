const whatsapp = require("../../helpers/whatsapp");

exports.createProduct = async (req, res) => {
  try {
    const sessionName = req.session;
    const sock = await whatsapp.getSession(sessionName);

    if (sock) {
      const data = await sock.productCreate({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        currency: req.body.currency,
        isHidden: req.body.isHidden,
        images: req.body.images,
        retailerId: req.body.retailerId,
        url: req.body.url,
      });

      return res.status(200).json({
        success: true,
        message: "Create product success",
        data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "device not found, please scan qr code",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "something went wrong on the server",
      data: {},
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const sessionName = req.session;
    const sock = await whatsapp.getSession(sessionName);

    if (sock) {
      const data = await sock.getCatalog();

      if (data) {
        return res.status(200).json({
          success: true,
          message: "get products success",
          data,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "data not found",
          data: [],
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "session not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
      data: {},
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const sessionName = req.session;
    const sock = await whatsapp.getSession(sessionName);

    if (sock) {
      const data = await sock.getCatalog(req.body.jid);

      if (data) {
        return res.status(200).json({
          success: true,
          message: "get product success",
          data,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "data not found",
          data: {},
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "session not found",
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

exports.updateProduct = async (req, res) => {
  try {
    const sessionName = req.session;
    const sock = await whatsapp.getSession(sessionName);

    if (sock) {
      let product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        currency: req.body.currency,
        isHidden: req.body.isHidden,
        images: req.body.images,
        retailerId: req.body.retailerId,
        url: req.body.url,
      };

      const data = await sock.productUpdate(req.params.id, product);

      return res.status(200).json({
        success: true,
        message: "update product success",
        data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "session not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong on ther server",
      data: {},
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const sessionName = req.session;
    const sock = await whatsapp.getSession(sessionName);

    if (sock) {
      const productIds = [req.params.id];
      const data = await sock.productDelete(productIds);

      return res.status(200).json({
        success: true,
        message: "delete product success",
        data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "session not found",
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

exports.getCollections = async (req, res) => {
  try {
    const sessionName = req.session;
    const sock = await whatsapp.getSession(sessionName);

    const data = await sock.getCollections();

    return res.status(200).json({
      success: true,
      message: "Get Collection Success",
      data: data
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong on ther server",
      data: {},
    });
  }
};
