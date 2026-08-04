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
  roleMiddleware("Administrator", "Insurance Agent"),
  upload.single("file"),
  uploadDocument
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("Administrator", "Insurance Agent"),
  getDocuments
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Administrator"),
  deleteDocument
);

module.exports = router;