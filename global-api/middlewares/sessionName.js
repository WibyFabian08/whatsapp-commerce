const checkSessionName = async (req, res, next) => {
  try {
    if (req.headers.session) {
      req.session = req.headers.session;
      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "session name is required in headers",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong oh the server",
    });
  }
};

module.exports = checkSessionName
