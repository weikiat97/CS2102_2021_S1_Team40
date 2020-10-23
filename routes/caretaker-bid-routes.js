let router = require("express").Router();
// Import contact controller
let bid_controller = require("../controllers/bid-controller");

// Contact routes
router
  .route("/:username")
  .get(bid_controller.view)
  .post(bid_controller.handle);

module.exports = router;
