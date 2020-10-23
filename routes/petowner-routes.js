let router = require("express").Router();
// Import contact controller
let petowner_controller = require("../controllers/petowner-controller");

// Contact routes
router.route("/").get(petowner_controller.index).post(petowner_controller.new);

router.route("/:username").post(petowner_controller.view);

module.exports = router;
