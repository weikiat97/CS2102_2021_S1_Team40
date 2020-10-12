let router = require("express").Router();
// Import contact controller
let leave_controller = require("../controllers/leave-controller");

// Contact routes
router.route("/").get(leave_controller.index).post(leave_controller.new);
// router
//   .route("/:pid")
//   .get(pet_controller.view)
//   .put(pet_controller.update)
//   .delete(pet_controller.delete);

module.exports = router;
