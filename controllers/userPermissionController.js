const { userPermission, User, Permission } = require("../models");
const { sendError } = require("../constant/error-handler");
const { sendSuccess } = require("../constant/success-handler");

// =============================== All Permissions =============================

exports.permissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    // res.status(200).json({
    //   status: "Success",
    //   message: "User permissions Found successfully.",
    //   permissions,
    // });
    return sendSuccess(
      res,
      200,
      "Success",
      "User permissions Found successfully.",
      permissions
    );
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
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
      perId: per.Permission.id,
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
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};

// =============================== Assign Permissions =============================

exports.updatePermissions = async (req, res) => {
  try {
    const { userId, perId } = req.body;
    const existingPermission = await userPermission.findOne({
      where: { userId, perId },
    });

    if (!existingPermission) {
      await userPermission.create({
        userId,
        perId,
      });

      // return res.status(200).json({
      //   success: true,
      //   message: "Permission added successfully",
      // });
      return sendSuccess(res, 200, "Success", "Permission added successfully.");
    } else {
      await userPermission.destroy({
        where: { userId, perId },
      });

      // return res.status(200).json({
      //   success: true,
      //   message: "Permission removed successfully",
      // });
      return sendSuccess(
        res,
        200,
        "Success",
        "Permission removed successfully."
      );
    }
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};
