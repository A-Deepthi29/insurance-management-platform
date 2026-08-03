const express = require("express");

const router = express.Router();

const claimController = require("../controllers/claimController");

const verifyToken = require("../middleware/authMiddleware");

// ===============================
// Claim Routes
// ===============================

router.get(
  "/",
  verifyToken,
  claimController.getClaims
);

router.post(
  "/",
  verifyToken,
  claimController.createClaim
);

router.put(
  "/:id",
  verifyToken,
  claimController.updateClaim
);

router.delete(
  "/:id",
  verifyToken,
  claimController.deleteClaim
);

module.exports = router;