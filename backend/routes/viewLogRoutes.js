const express = require("express");
const router = express.Router();
const { get30daysView, addView } = require("../controller/viewLogController");

router.get("/get30daysView", get30daysView);
router.post("/addView", addView);

module.exports = router;
