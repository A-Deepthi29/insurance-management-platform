const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createPremium,
  getPremiums,
  getPremiumById,
  updatePremium,
  deletePremium,
} = require("../controllers/premiumController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  createPremium
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  getPremiums
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  getPremiumById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  updatePremium
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  deletePremium
);

module.exports = router;