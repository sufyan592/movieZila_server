const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// =============================== Signup User =============================

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;

    const hashpassword = await bcrypt.hash(password, saltRounds);

    console.log(hashpassword);

    const user = await User.create({
      name,
      email,
      password: hashpassword,
    });

    res.status(201).json({
      status: "Success",
      message: "User created successfully!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }

  next();
};

// =============================== login User =============================

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      console.log("User not found");
      return res
        .status(404)
        .json({ status: "Fail", message: "User not found" });
    }

    const matched = await bcrypt.compare(password, foundUser.password);

    if (!matched) {
      console.log("Password not matched");
      return res
        .status(401)
        .json({ status: "Fail", message: "Password not matched" });
    }

    const token = jwt.sign({ user: foundUser }, process.env.SECRETE_KEY, {
      expiresIn: process.env.Expires_TIME,
    });

    res.status(200).json({
      status: "Success",
      message: "User found successfully!",
      user: foundUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

// =============================== all User =============================

exports.allUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 3;
    const offset = (page - 1) * limit;

    const users = await User.findAll({
      limit,
      offset,
    });

    res.status(200).json({
      status: "Success",
      message: "Users fetched successfully!",
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};

// =============================== Single User =============================

exports.singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        error: "User not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "User fetched successfully!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};

// =============================== Delete User =============================

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        status: "Fail",
        error: "User not found",
      });
    }

    await user.destroy();

    res.status(200).json({
      status: "Success",
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};

// =============================== User Authorization =============================

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
    const decode = await jwt.verify(token, process.env.SECRETE_KEY);
    req.user = decode.user;

    next();
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "You are not allowed to access this",
      error,
    });
  }
};
