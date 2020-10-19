let router = require("express").Router();
// Import contact controller
let leave_controller = require("../controllers/leave-controller");

// Contact routes
router
  .route("/:username")
  .get(leave_controller.view)
  .post(leave_controller.new)
  .put(leave_controller.update)
  .delete(leave_controller.delete);

module.exports = router;
