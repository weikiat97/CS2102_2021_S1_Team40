let router = require("express").Router();
// Import contact controller
let user_controller = require("../controllers/user-controller");

// Contact routes
router.route("/").get(user_controller.index).post(user_controller.new);

module.exports = router;
