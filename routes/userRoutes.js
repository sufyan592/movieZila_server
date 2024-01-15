const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/").get(userController.allUsers);
router.route("/:id").get(userController.singleUser);
router.route("/:id").delete(userController.deleteUser);

module.exports = router;
