const Cryptr = require("cryptr");
const cryptr = new Cryptr("rahasia");

const auth = async (req, res, next) => {
  try {
    if (req.headers["x-api-key"]) {
      const userData = cryptr.decrypt(req.headers["x-api-key"]);
      req.user = userData;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "unauhthenticated, apikey is required",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong oh the server",
    });
  }
};

module.exports = auth;
