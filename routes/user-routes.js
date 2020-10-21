let router = require("express").Router();
// Import contact controller
let user_controller = require("../controllers/user-controller");

// Contact routes
router.route("/").get(user_controller.index);

router.route("/:username").post(user_controller.view);

module.exports = router;
