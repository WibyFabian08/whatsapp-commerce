const jwt = require("jsonwebtoken");

const useAuthToken = async (req, res, next) => {
  try {
    if (req.headers.token) {
      try {
        const decoded = jwt.verify(req.headers.token, "secret");
        req.userData = decoded.email;
        next();
      } catch (err) {
        return res.status(403).json({
          success: false,
          message: "invalid token",
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "unauhthenticated, token is required",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong oh the server",
    });
  }
};

module.exports = useAuthToken;
