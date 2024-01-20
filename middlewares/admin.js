const { User } = require("../models");
exports.restrict = (role) => {
  return async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.user } });
    if (role !== user.role) {
      return res.status(403).json({
        status: "Fail",
        message: "Un Authorized!",
      });
    }
    next();
  };
};
