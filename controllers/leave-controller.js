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
exports.new = async function (req, res) {
    try {
        console.log("i'm at create leaves in leave-controller");
        console.log("username: " + req.body.ftct_username);
        console.log("start_date: " + req.body.start_date);
        console.log("end_date: " + req.body.end_date);
      const add_leave = await leave_model.addNewLeave(
          req.body.ftct_username,
          req.body.start_date, 
          req.body.end_date
        );
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
exports.view = async function (req, res) {
  try {
    console.log("params!!!!: " + req.params.username);
    console.log("????");
    console.log("WTFFF");
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
            message: "No leaves found!",
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
exports.update = async function (req, res) {
  try {
    const update_leave = await leave_model.updateLeave(
        req.body.ftct_username, 
        req.body.old_start_date, 
        req.body.old_end_date, 
        req.body.new_start_date, 
        req.body.new_end_date
    );
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
exports.delete = async function (req, res) {
  try {
      console.log("wassup dog");
      console.log("look at mah body: " + req.body);
      const util = require('util')

console.log(util.inspect(req.body, {showHidden: false, depth: null}))

      console.log("username: " + req.body.ftct_username);
      console.log("start: " + req.body.start_date);
      console.log("end: " + req.body.end_date);
        console.log("byenow");
    const delete_leave = await leave_model.deleteLeave(
        req.body.ftct_username, 
        req.body.start_date, 
        req.body.end_date
    );
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
