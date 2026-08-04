const express = require("express");
const router = express.Router();

const {
  createPolicy,
  getPolicies,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");

// Create Policy
router.post("/", createPolicy);

// Get All Policies
router.get("/", getPolicies);

// Update Policy
router.put("/:id", updatePolicy);

// Delete Policy
router.delete("/:id", deletePolicy);

module.exports = router;