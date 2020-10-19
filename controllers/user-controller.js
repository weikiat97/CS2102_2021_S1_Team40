let user_model = require("../models/user-model");
// Handle index actions
exports.index = async function (req, res) {
  try {
    const users = await user_model.get();
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

// Handle view user info
exports.view = async function (req, res) {
  try {
    const user = await user_model.getSingleUser(
      req.params.username,
      req.body.password
    );
    if (user) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: user,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "User not found, check that your login details are correct",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Handle create user actions
exports.new = async function (req, res) {
  try {
    const user = await user_model.addNewUser(
      req.body.username,
      req.body.password
    );
    if (user) {
      res.status(200).json({
        status: "success",
        message: "Signup successful",
        data: user,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Signup failed",
      });
    }
    await user_model.addNewUser(req.body.username, req.body.password);
    res.status(200).json({
      status: "success",
      message: "Signup successful",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
