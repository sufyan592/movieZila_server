const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const permissionController = require("../controllers/userPermissionController");
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
// const userPermissionsMiddleware = require("../middlewares/userPermissionsMiddleware");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router
  .route("/")
  .get(
    authMiddleware.auth,
    adminMiddleware.restrict("admin"),
    userController.allUsers
  );

router
  .route("/permissions")
  .patch(permissionController.updatePermissions)
  .get(permissionController.permissions)
  .get(permissionController.getPermissions);
router.route("/allUserpermissions").get(permissionController.getPermissions);

router.route("/:id").get(userController.singleUser);
router.route("/:id").delete(userController.deleteUser);

module.exports = router;
