const express = require("express");
const router = express.Router();
const logController = require("../controllers/log");
router.route("/").get(logController.getLogs);
router.route("/create").post(logController.createLog);
router.route("/:date/:month/:year").get(logController.getLogOfDate);
router.route("/:id").put(logController.updateLog);
router.route("/:id").delete(logController.deleteLog);

module.exports = router;
