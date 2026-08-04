const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getClaims,
  createClaim,
  updateClaim,
  deleteClaim,
} = require("../controllers/claimController");

router.post("/", authMiddleware, createClaim);
router.get("/", authMiddleware, getClaims);
router.put("/:id", authMiddleware, updateClaim);
router.delete("/:id", authMiddleware, deleteClaim);

module.exports = router;