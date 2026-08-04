const express = require("express");
const router = express.Router();

const {
  createPolicy,
  getPolicies,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  createPolicy
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  getPolicies
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  updatePolicy
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  deletePolicy
);

module.exports = router;