let pet_model = require('../models/pet-model');
// Handle index actions
exports.index = async function (req, res) {
  try {
    const pets = await pet_model.get();
    res.json({
      status: "success",
      message: "Pets retrieved successfully",
      data: pets
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err,
    });
  }
};
// Handle create pet actions
exports.new = function (req, res) {
  res.json({
    message: 'To be implemented'
  });
};
// Handle view pet info
exports.view = function (req, res) {
  res.json({
    message: 'To be implemented'
  });
};
// Handle update pet info
exports.update = function (req, res) {
  res.json({
    message: 'To be implemented'
  });
};
// Handle delete pet
exports.delete = function (req, res) {
  res.json({
    message: 'To be implemented'
  });
};