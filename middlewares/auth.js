const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    const decode = jwt.verify(token, process.env.SECRETE_KEY);

    req.user = decode.userId;
    console.log("Decoded User:", decode.userId);

    next();
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "You are not allowed to access this",
      error,
    });
  }
};
