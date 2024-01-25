const { userPermission, User, Permission } = require("../models");
const { sendError, sendSuccess } = require("../helpers/response");

// =============================== All Permissions =============================

exports.permissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    return sendSuccess(
      res,
      200,
      "Success",
      "User permissions Found successfully.",
      permissions
    );
  } catch (error) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};

// =============================== All User Permissions =============================

exports.getPermissions = async (req, res) => {
  try {
    const userPer = await userPermission.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Permission,
        },
      ],
    });

    const permissions = userPer.map((per) => ({
      userId: per.User.id,
      permissionId: per.Permission.id,
      name: per.User.name,
      email: per.User.email,
      permission: per.Permission.perName,
    }));

    return sendSuccess(
      res,
      200,
      "Success",
      "You have successfully created an account.",
      permissions
    );
  } catch (error) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};

// =============================== Assign Permissions =============================

exports.updatePermissions = async (req, res) => {
  try {
    const { userId, permissionId } = req.body;
    const existingPermission = await userPermission.findOne({
      where: { userId, permissionId },
    });

    if (!existingPermission) {
      await userPermission.create({
        userId,
        permissionId,
      });

      return sendSuccess(res, 200, "Success", "Permission added successfully.");
    } else {
      await userPermission.destroy({
        where: { userId, permissionId },
      });

      return sendSuccess(
        res,
        200,
        "Success",
        "Permission removed successfully."
      );
    }
  } catch (error) {
    return sendError(res, 500, "Error", "Internel Server Error.");
  }
};
