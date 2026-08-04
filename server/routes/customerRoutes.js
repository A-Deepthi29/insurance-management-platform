const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Customer (Admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  customerController.addCustomer
);

// Get Customers (Admin & Agent)
router.get(
  "/",
  authMiddleware,
  roleMiddleware(
    "Administrator",
    "Insurance Agent"
),
  customerController.getCustomers
);

// Update Customer (Admin only)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  customerController.updateCustomer
);

// Delete Customer (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  customerController.deleteCustomer
);

module.exports = router;