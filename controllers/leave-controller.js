let leave_model = require("../models/leave-model");

// Handle index actions
exports.index = async function (req, res) {
  try {
    const all_leaves = await leave_model.get();
    res.json({
      status: "success",
      message: "Leaves retrieved successfully",
      data: all_leaves,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};

// Handle create leave actions
exports.new = function (req, res) {
    try {
        const add_leave = await leave_model.post();
        res.json({
          status: "success",
          message: "Leave added successfully",
          data: add_leave,
        });
      } catch (err) {
        res.json({
          status: "error",
          message: err,
        });
      }
};


// Handle view leave info
exports.view = function (req, res) {
  res.json({
    message: "To be implemented",
  });
};


// Handle update leave info
exports.update = function (req, res) {
    try {
        const update_leave = await leave_model.update();
        res.json({
          status: "success",
          message: "Leave updated successfully",
          data: leaves_applied,
        });
      } catch (err) {
        res.json({
          status: "error",
          message: err,
        });
      }
};


// Handle delete leave
exports.delete = function (req, res) {
    try {
        const delete_leave = await leave_model.delete();
        res.json({
          status: "success",
          message: "Leave deleted successfully",
          data: delete_leave,
        });
      } catch (err) {
        res.json({
          status: "error",
          message: err,
        });
      }
};
