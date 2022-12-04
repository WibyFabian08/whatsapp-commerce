const whatsapp = require("../../helpers/whatsapp");
const { Product } = require("../../models/index");
const axios = require("axios");

exports.createProduct = async (req, res) => {
  try {
    const deviceId = req.user;

    const device = await axios.get(
      `http://localhost:8000/global/api/session/find/id/${parseInt(deviceId)}`
    );

    const dataToWhatsApp = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      isHidden: req.body.isHidden,
      images: req.body.images,
      retailerId: req.body.retailerId,
      url: req.body.url,
    };

    const headers = {
      session: device.data.data.name,
    };

    const data = await axios.post(
      "http://localhost:8000/global/api/product/create",
      dataToWhatsApp,
      {
        headers: headers,
      }
    );

    // data to db user
    const product = await Product.create({
      productId: data.data.data.id,
      deviceId: deviceId,
      categoryId: req.body.categoryId,
      name: data.data.data.name,
      price: data.data.data.price,
      description: data.data.data.description,
      images: req.body.images[0].url,
    });

    return res.status(200).json({
      success: true,
      message: "create product success",
      data: product,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
      data: {},
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const deviceId = req.user;

    const products = await Product.findAll({
      where: {
        deviceId: parseInt(deviceId),
      },
    });

    if (products.length > 0) {
      return res.status(200).json({
        success: true,
        message: "get products success",
        data: products,
      });
    } else {
      return res.status(404).json({
        success: false,
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

exports.getProduct = async (req, res) => {
  try {
    const deviceId = req.user;

    const product = await Product.findOne({
      where: {
        productId: req.params.id,
        deviceId: deviceId,
      },
    });

    if (product) {
      return res.status(200).json({
        success: true,
        message: "get product success",
        data: product,
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
      message: "something went wrong on ther server",
      data: {},
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const deviceId = req.user;

    const device = await axios.get(
      `http://localhost:8000/global/api/session/find/id/${parseInt(deviceId)}`
    );

    const dataToWhatsApp = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      isHidden: req.body.isHidden,
      images: req.body.images,
      retailerId: req.body.retailerId,
      url: req.body.url,
    };

    const headers = {
      session: device.data.data.name,
    };

    const data = await axios.put(
      `http://localhost:8000/global/api/product/update/${req.params.id}`,
      dataToWhatsApp,
      {
        headers: headers,
      }
    );

    // data to db user
    const product = await Product.update(
      {
        productId: data.data.data.id,
        deviceId: deviceId,
        categoryId: req.body.categoryId,
        name: data.data.data.name,
        price: data.data.data.price,
        description: data.data.data.description,
        images: req.body.images[0].url,
      },
      {
        where: {
          productId: data.data.data.id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "update product success",
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on ther server",
      data: {},
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deviceId = req.user;

    const device = await axios.get(
      `http://localhost:8000/global/api/session/find/id/${parseInt(deviceId)}`
    );

    await axios.delete(
      `http://localhost:8000/global/api/product/delete/${req.params.id}`,
      {
        headers: {
          session: device.data.data.name,
        },
      }
    );

    const product = await Product.findOne({
      where: {
        productId: req.params.id,
        deviceId: deviceId,
      },
    });

    await product.destroy();

    return res.status(200).json({
      success: true,
      message: "delete product success",
      // data,
    });
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
      // data: sock,
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
