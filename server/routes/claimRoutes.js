const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getClaims,
  createClaim,
  updateClaim,
  deleteClaim,
} = require("../controllers/claimController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  createClaim
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  getClaims
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  updateClaim
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  deleteClaim
);

module.exports = router;