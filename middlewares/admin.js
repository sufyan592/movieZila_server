const { sendError } = require("../helpers/response");
const { User } = require("../models");
exports.restrict = (role) => {
  return async (req, res, next) => {
    const { userId } = req.user;
    const user = await User.findOne({ where: { id: userId } });
    if (role !== user.role) {
      return sendError(res, 403, "Error", "Unauthorized");
    }
    next();
  };
};
