let caretaker_model = require("../models/caretaker-model");
// Handle index actions
exports.index = async function (req, res) {
  try {
    const caretakers = await caretaker_model.get();
    res.json({
      status: "success",
      message: "Caretakers retrieved successfully",
      data: caretakers,
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
    const caretaker = await caretaker_model.getSingleCareTaker(
      req.params.username,
      req.body.password
    );
    if (caretaker) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: caretaker,
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
    console.log("got come here?");
    console.log("user: " + req.body.username);
    console.log("user: " + req.body.password);
    const caretaker = await caretaker_model.addNewCareTaker(
      req.body.username,
      req.body.password
    );
    if (caretaker) {
      res.status(200).json({
        status: "success",
        message: "Signup as a caretaker successful",
        data: caretaker,
      });
    } else {
      res.status(500).json({
        status: "failure",
        message: "Signup as a caretaker failed",
      });
    }
    await caretaker_model.addNewCareTaker(req.body.username, req.body.password);
    res.status(200).json({
      status: "success",
      message: "Signup as caretaker successful",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
