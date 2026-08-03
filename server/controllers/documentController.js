const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fs = require("fs");
const path = require("path");
const uploadDocument = async (req, res) => {
  try {
    const { customerId } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please select a file",
      });
    }

    const document = await prisma.document.create({
      data: {
        customerId: Number(customerId),
        fileName: req.file.originalname,
        filePath: req.file.filename,
      },
    });

    res.status(201).json({
      message: "Document Uploaded Successfully",
      document,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getDocuments = async (req, res) => {
  try {

    const documents = await prisma.document.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(documents);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteDocument = async (req, res) => {
  try {

    const id = Number(req.params.id);

    const document = await prisma.document.findUnique({
      where: {
        id,
      },
    });

    if (!document) {
      return res.status(404).json({
        message: "Document Not Found",
      });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      document.filePath
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.document.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Document Deleted Successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  deleteDocument,
};