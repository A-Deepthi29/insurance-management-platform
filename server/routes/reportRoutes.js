const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getReport,
} = require("../controllers/reportController");

// Get Dashboard Report
router.get("/", authMiddleware, getReport);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("Administrator"),
    getReport
);

module.exports = router;