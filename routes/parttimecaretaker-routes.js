let router = require("express").Router();
// Import contact controller
let parttimecaretaker_controller = require("../controllers/parttimecaretaker-controller");

// Contact routes
router
  .route("/")
  .get(parttimecaretaker_controller.index)
  .post(parttimecaretaker_controller.new);

router.route("/:username").post(parttimecaretaker_controller.view);

module.exports = router;
