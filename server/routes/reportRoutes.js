const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getReport,
} = require("../controllers/reportController");

// Get Dashboard Report
router.get("/", authMiddleware, getReport);

module.exports = router;