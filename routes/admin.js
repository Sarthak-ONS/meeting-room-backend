const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.post("/postDanger", adminController.postDanger);

router.post("/displaydata", adminController.sendDatatoServer);

router.get("/getlogs", adminController.fetchLogsFromHardwareServer);

module.exports = router;
