const { sendError } = require("../helpers/response");
const { userPermission, Permission } = require("../models");

// exports.checkPermissions = async (req, res, next) => {
//   try {
//     const { userPermissions, userId } = req.user;

//     for (const permissionName of userPermissions) {
//       const userPermissions = await Permission.findOne({
//         where: { name: permissionName },
//       });

//       if (userPermissions) {
//         const permissions = await userPermission.findOne({
//           userId: userId,
//           permissionId: userPermission.id,
//         });

//         if (permissions) {
//           req[`${permissionName.toLowerCase()}Permission`] = true;
//         } else {
//           console.log(`User does not have permission: ${permissionName}`);
//         }
//       } else {
//         console.log(`Permission not found: ${permissionName}`);
//       }
//     }
//     req.userId = userId;
//     req.user = null;
//     next();
//   } catch (error) {
//     console.error("Error checking permissions:", error);
//     return res.status(500).json({ message: "Server Error." });
//   }
// };

// exports.userPermission = async (req, res, next) => {
//   //   const userId = req.userId;
//   //   const user = await User.findOne({ where: { id: userId } });
//   //   console.log("Users::", user);
//   console.log("User:::", req.user);

//   const { userPermissions, userId } = req.user;

//   for (const permissions of userPermissions) {
//     console.log("Without DB:::", permissions);
//     const userPermissions = await Permission.findOne({
//       where: { name: permissions },
//     });
//     console.log("With DB:::", userPermissions);

//     if (userPermissions) {
//       const permissions = await userPermission.findOne({
//         userId: userId,
//         permissionId: userPermission.id,
//       });
//       console.log("Find User With DB:::", permissions);
//     }
//   }

//   //   console.log("Per", userPermissions);

//   //   const data = userPermissions.map((permissions) => {
//   //     return permissions;
//   //   });
//   //   console.log("Map:", data);

//   //   for (permissions of userPermissions) {
//   //     console.log("For of:", permissions);
//   //   }

//   //   userPermissions.forEach((permissions) => {
//   //     console.log("ForEach:", permissions);
//   //   });
// };

// exports.checkPermissions = async (req, res, next) => {
//   // console.log("Checking permissions.");
//   try {
//     const user = req.user;
//     // Set flags in req object based on user's permissions
//     for (const permissionName of user.permissions) {
//       const permission = await Permissions.findOne({ name: permissionName });

//       if (permission) {
//         const userPermission = await UserPermissions.findOne({
//           userId: user.id,
//           permissionId: permission.id,
//         });

//         if (userPermission) {
//           // Set flags in req object based on permission
//           req[`${permissionName.toLowerCase()}Permission`] = true;
//         } else {
//           console.log(`User does not have permission: ${permissionName}`);
//         }
//       } else {
//         console.log(`Permission not found: ${permissionName}`);
//       }
//     }
//     req.userId = user.id;
//     req.user = null;
//     next();
//   } catch (error) {
//     console.error("Error checking permissions:", error);
//     return res.status(500).json({ message: "Server Error." });
//   }
// };


exports.createPermission = async (req, res, next) => {
  try {
    const { userPermissions } = req.user;
    const permission = userPermissions.includes("create");
    if (!permission) {
      sendError(res, 401, "Error", "User does not have permission.");
    }
    next();
  } catch (error) {
    sendError(res, 500, "Error", "Internal Server Error.");
  }
};
exports.EditPermission = async (req, res, next) => {
  try {
    const { userPermissions } = req.user;
    const permission = userPermissions.includes("edit");
    if (!permission) {
      sendError(res, 401, "Error", "User does not have permission.");
    }
    next();
  } catch (error) {
    sendError(res, 500, "Error", "Internal Server Error.");
  }
};
exports.deletePermission = async (req, res, next) => {
  try {
    const { userPermissions } = req.user;
    const permission = userPermissions.includes("delete");
    if (!permission) {
      sendError(res, 401, "Error", "User does not have permission.");
    }
    next();
  } catch (error) {
    sendError(res, 500, "Error", "Internal Server Error.");
  }
};
