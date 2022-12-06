const { User } = require("../../models/index");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("rahasia");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.signUp = async (req, res) => {
  try {
    let data = {
      phone: req.body.phone,
      name: req.body.name,
      email: req.body.email,
      packageId: req.body.packageId,
      status: "aktif",
    };

    const password = cryptr.encrypt(req.body.password);
    data.password = password;

    const checkEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (checkEmail) {
      return res.status(403).json({
        success: false,
        message: "email already use",
      });
    } else {
      const newUser = await User.create(data);
      return res.status(200).json({
        success: true,
        message: "signup success",
        data: newUser,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
      raw: true,
    });

    if (user) {
      const passwordDecrypt = cryptr.decrypt(user.password);

      const token = jwt.sign(
        {
          data: {
            id: user.id,
          },
        },
        "secret",
        { expiresIn: "30h" }
      );

      if (req.body.password === passwordDecrypt) {
        return res.status(200).json({
          success: true,
          messsage: "sign in success",
          data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            packageId: user.packageId
          },
          token: token,
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "wrong password",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "account not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.userData,
    });

    const newPassword = cryptr.encrypt(req.body.newPassword);

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "change password success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

// nama paket
// jumlah kuouta / device
// id

// tambah tabel template

// sjahidin4@gmail.com
// M3tech2021
