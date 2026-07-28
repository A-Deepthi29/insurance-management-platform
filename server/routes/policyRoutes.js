const express = require("express");
const router = express.Router();

const {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");

// Create Policy
router.post("/", createPolicy);

// Get All Policies
router.get("/", getPolicies);

// Get Single Policy
router.get("/:id", getPolicyById);

// Update Policy
router.put("/:id", updatePolicy);

// Delete Policy
router.delete("/:id", deletePolicy);

module.exports = router;