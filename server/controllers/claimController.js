const prisma = require("../config/prisma");

// ===============================
// Get All Claims
// ===============================
exports.getClaims = async (req, res) => {
  try {
    const claims = await prisma.claim.findMany({
      include: {
        policy: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(claims);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch claims",
    });
  }
};

// ===============================
// Create Claim
// ===============================
exports.createClaim = async (req, res) => {
  try {
    const {
      policyId,
      claimAmount,
      reason,
      status,
      submissionDate,
    } = req.body;

    const claim = await prisma.claim.create({
      data: {
        policyId: Number(policyId),
        claimAmount: Number(claimAmount),
        reason,
        status,
        submissionDate: new Date(submissionDate),
      },
    });

    res.status(201).json({
      message: "Claim Created Successfully",
      claim,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create claim",
    });
  }
};

// ===============================
// Update Claim
// ===============================
exports.updateClaim = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      policyId,
      claimAmount,
      reason,
      status,
      submissionDate,
    } = req.body;

    const claim = await prisma.claim.update({
      where: {
        id: Number(id),
      },
      data: {
        policyId: Number(policyId),
        claimAmount: Number(claimAmount),
        reason,
        status,
        submissionDate: new Date(submissionDate),
      },
    });

    res.json({
      message: "Claim Updated Successfully",
      claim,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Update Failed",
    });
  }
};

// ===============================
// Delete Claim
// ===============================
exports.deleteClaim = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.claim.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Claim Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Delete Failed",
    });
  }
};