let router = require("express").Router();
// Import contact controller
let fulltimecaretaker_controller = require("../controllers/fulltimecaretaker-controller");

// Contact routes
router
  .route("/")
  .get(fulltimecaretaker_controller.index)
  .post(fulltimecaretaker_controller.new);

router.route("/:username").post(fulltimecaretaker_controller.view);

module.exports = router;
