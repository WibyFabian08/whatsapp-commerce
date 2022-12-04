const { ProductCategory } = require("../../models/index");

exports.getAll = async (req, res) => {
  try {
    const category = await ProductCategory.findAll();

    if (category.length > 0) {
      return res.status(200).json({
        success: true,
        message: "get products category success",
        data: category,
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

exports.getById = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (category) {
      return res.status(200).json({
        success: true,
        message: "get product category success",
        data: category,
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

exports.create = async (req, res) => {
  try {
    const category = await ProductCategory.create({
      name: req.body.name,
      available: req.body.available,
    });
    return res.status(200).json({
      success: true,
      message: "create product category success",
      data: category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (category) {
      category.name = req.body.name || category.name;
      category.available = req.body.available || category.available;

      await category.save();

      return res.status(200).json({
        success: true,
        message: "update data success",
        data: category,
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
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (category) {
      await category.destroy();

      return res.status(200).json({
        success: true,
        message: "delete data success",
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
    });
  }
};
