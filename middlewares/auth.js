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
    req.user = decode;

    next();
  } catch (error) {
    return sendError(res, 500, "Error", "Unauthorized");
  }
};
