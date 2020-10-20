let caretaker_model = require("../models/caretaker-model");
// Handle index actions
exports.view = async function (req, res) {
  try {
    const caretakers = await caretaker_model.getRequiredCaretakers(
        //maximum_price, pet_type, start_date, end_date
        req.body.maximum_price,
        req.body.pet_type,
        req.body.start_date,
        req.body.end_date,
    );
    res.json({
      status: "success",
      message: "caretakers retrieved successfully",
      data: caretakers,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};