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

router.post("/", authMiddleware, createPremium);

router.get("/", authMiddleware, getPremiums);

router.get("/:id", authMiddleware, getPremiumById);

router.put("/:id", authMiddleware, updatePremium);

router.delete("/:id", authMiddleware, deletePremium);

module.exports = router;