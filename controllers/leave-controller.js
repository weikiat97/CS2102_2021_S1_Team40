let leave_model = require("../models/leave-model");

// Handle index actions
exports.index = async function (req, res) {
  try {
    const all_leaves = await leave_model.getAllLeaves();
    if (all_leaves) {
        res.status(200).json({
            status: "success",
            message: "Leave retrieved successful",
            data: all_leaves
        })
    } else {
        res.status(404).json({
            status: "failure",
            message: "Leave not retrieved.",
            data: all_leaves
        })
    }
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: err
      })
  }
};

// Handle create leave actions
exports.new = function (req, res) {
    try {
      const add_leave = await leave_model.addNewLeave(req.params.username, req.params.start_date, req.params.end_date);
      if (add_leave) {
          res.status(200).json({
              status: "success",
              message: "Leave added successful",
              data: add_leave
          })
      } else {
          res.status(404).json({
              status: "failure",
              message: "Leave not added, please check that you are logged in and you have included valid dates.",
              data: add_leave
          })
      }
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: err
      })
  }
};


// Handle view leave info
exports.view = function (req, res) {
  try {
    const get_user_leaves = await leave_model.getUserLeaves(req.params.username);
    if (get_user_leaves) {
        res.status(200).json({
            status: "success",
            message: "User's leaves retrieved successfully.",
            data: get_user_leaves
        })
    } else {
        res.status(404).json({
            status: "failure",
            message: "Leave not added, please check that you are logged in.",
            data: get_user_leaves
        })
    }
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: err,
      })
  }
};


// Handle update leave info
exports.update = function (req, res) {
  try {
    const update_leave = await leave_model.getUserLeaves(req.params.username, req.params.old_start_date, req.params.old_end_date, req.body.new_start_date, req.body.new_end_date);
    if (update_leave) {
        res.status(200).json({
            status: "success",
            message: "User's leave updated successfully.",
            data: update_leave
        })
    } else {
        res.status(404).json({
            status: "failure",
            message: "Leave not added, please check that you are logged in and you have included valid dates.",
            data: update_leave
        })
    }
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: err
      })
  }
};


// Handle delete leave
exports.delete = function (req, res) {
  try {
    const delete_leave = await leave_model.getUserLeaves(req.params.username, req.params.start_date, req.params.end_date);
    if (delete_leave) {
        res.status(200).json({
            status: "success",
            message: "User's leave deleted successfully.",
            data: delete_leave
        })
    } else {
        res.status(404).json({
            status: "failure",
            message: "Leave not deleted, please check that you are logged in and you have chosen a valid leave",
            data: delete_leave
        })
    }
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: err
      })
  }
};
