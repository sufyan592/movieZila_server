const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userPermission, User, Permission } = require("../models");
const sendEmail = require("../utils/email");
const { sendError } = require("../constant/error-handler");
const { sendSuccess } = require("../constant/success-handler");

// =============================== Signup User =============================

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         status: "Fail",
//         message: "Please provide all details!",
//       });
//     }

//     const saltRounds = 10;
//     const hashpassword = await bcrypt.hash(password, saltRounds);
//     const user = await User.create({
//       name,
//       email,
//       password: hashpassword,
//     });

//     await sendEmail({
//       email: user.email,
//       subject: "MovieZila Registration!",
//       message: "Congrations!, you've registered successfully.",
//     });

//     res.status(201).json({
//       status: "Success",
//       message: "User created successfully!",
//       data: user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "Fail",
//       error: "Internal Server Error",
//     });
//   }
// };

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return sendError(res, 400, "Fail", "Please enter all details.");
    }

    const existsEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existsEmail) {
      return sendError(res, 409, "Fail", "Email Already Exists.");
    }

    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      email,
      password: hashpassword,
    });

    // Uncomment the following section once you have the sendEmail function implemented
    // await sendEmail({
    //   email: user.email,
    //   subject: "MovieZila Registration!",
    //   message: "Congratulations! You've registered successfully.",
    // });

    return sendSuccess(
      res,
      201,
      "Success",
      "You have successfully created an account."
    );
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Fail", "Internal Server Error.");
  }
};

// =============================== login User =============================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // return res.status(400).json({
      //   status: "Fail",
      //   message: "Please provide all details!",
      // });
      return sendError(res, 400, "Fail", "Please enter all deatails.");
    }

    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      // return res
      //   .status(404)
      //   .json({ status: "Fail", message: "User not found" });
      return sendError(res, 404, "Fail", "User not found.");
    }

    const matched = await bcrypt.compare(password, foundUser.password);

    if (!matched) {
      // return res
      //   .status(401)
      //   .json({ status: "Fail", message: "Password not matched" });
      return sendError(res, 401, "Fail", "Credentials are wrong.");
    }

    const userId = foundUser.id;
    const userPermissions = await userPermission.findAll({
      where: { userId },
      include: [{ model: Permission, attributes: ["name"] }],
    });

    const permissionNames = userPermissions.map(
      (userPermission) => userPermission.Permission.name
    );

    const token = jwt.sign(
      { userId: userId, userPermissions: permissionNames },
      process.env.SECRETE_KEY,
      {
        expiresIn: process.env.Expires_TIME,
      }
    );

    return sendSuccess(res, 200, "Success", "User found Successfully.", token);
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};

// =============================== all User =============================

exports.allUsers = async (req, res) => {
  try {
    // const page = req.query.page || 1;
    // const limit = 5;
    // const offset = (page - 1) * limit;

    const users = await User.findAll({
      // limit,
      // offset,
    });

    // res.status(200).json({
    //   status: "Success",
    //   message: "Users fetched successfully!",
    //   count: users.length,
    //   data: users,
    // });
    return sendSuccess(
      res,
      200,
      "Success",
      "Users fetched successfully!.",
      users
    );
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};

// =============================== Single User =============================

exports.singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      // return res.status(404).json({
      //   status: "Fail",
      //   error: "User not found",
      // });
      return sendError(res, 404, "Fail", "User not found.");
    }

    // res.status(200).json({
    //   status: "Success",
    //   message: "User fetched successfully!",
    //   data: user,
    // });
    return sendSuccess(res, 200, "Success", "User found successfully!.", user);
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};

// =============================== Delete User =============================

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      // return res.status(404).json({
      //   status: "Fail",
      //   error: "User not found",
      // });
      return sendError(res, 404, "Fail", "User not found.");
    }

    await user.destroy();
    // res.status(200).json({
    //   status: "Success",
    //   message: "User deleted successfully!",
    // });
    return sendSuccess(res, 200, "Success", "User deleted successfully.");
  } catch (error) {
    return sendError(res, 500, "Fail", "Internel Server Error.");
  }
};
