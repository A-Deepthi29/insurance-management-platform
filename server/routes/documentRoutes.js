const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const {
  uploadDocument,
  getDocuments,
  deleteDocument,
} = require("../controllers/documentController");

// Upload Document
router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  uploadDocument
);

// Get All Documents
router.get(
  "/",
  authMiddleware,
  getDocuments
);

// Delete Document
router.delete(
  "/:id",
  authMiddleware,
  deleteDocument
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware(
    "Administrator",
    "Insurance Agent"
),
    uploadDocument
);

module.exports = router;