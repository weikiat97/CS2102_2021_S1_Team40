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
            message: err,
        });
    }
};

// Handle create pet actions
exports.new = function (req, res) {
    res.json({
        message: "To be implemented",
    });
};