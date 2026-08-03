const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createPremium,
  getPremiums,
  getPremiumById,
  updatePremium,
  deletePremium,
} = require("../controllers/premiumController");

// Create Premium
router.post("/", authMiddleware, createPremium);

// Get All Premiums
router.get("/", authMiddleware, getPremiums);

// Get Single Premium
router.get("/:id", authMiddleware, getPremiumById);

// Update Premium
router.put("/:id", authMiddleware, updatePremium);

// Delete Premium
router.delete("/:id", authMiddleware, deletePremium);

module.exports = router;