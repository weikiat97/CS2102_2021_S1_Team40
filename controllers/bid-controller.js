let bid_model = require("../models/bid-model");

// Handle view bid info
exports.view = async function (req, res) {
  try {
    const get_user_bids = await bid_model.getUserBids(
      req.params.username
    );
    if (get_user_bids) {
      res.status(200).json({
        status: "success",
        message: "User's bids retrieved successfully.",
        data: get_user_bids,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message: "No bids found!",
        data: get_user_bids,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

// Handle accept bid actions
exports.accept = async function (req, res) {
  try {
    const accept_bid = await bid_model.acceptBid(
      req.body.petowner_username,
      req.body.pet_name,
      req.body.caretaker_username,
      req.body.start_date,
      req.body.end_date
    );
    if (add_leave) {
      res.status(200).json({
        status: "success",
        message: "Bid accept successful",
        data: accept_bid,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message:
          "Bid not accept, please check that you are logged in and you have chosen a valid bid.",
        data: accept_bid,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

// Handle decline bid info
exports.decline = async function (req, res) {
  try {
    const decline_bid = await bid_model.declineBid(
      req.body.petowner_username,
      req.body.pet_name,
      req.body.caretaker_username,
      req.body.start_date,
      req.body.end_date
    );
    if (decline_bid) {
      res.status(200).json({
        status: "success",
        message: "Bid declined successfully.",
        data: decline_bid,
      });
    } else {
      res.status(404).json({
        status: "failure",
        message:
          "Bid not declined, please check that you are logged in and you have chosen a valid bid.",
        data: decline_bid,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};