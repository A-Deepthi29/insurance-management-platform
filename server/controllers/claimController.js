const prisma = require("../config/prisma");

// ===============================
// Get Claims (Search + Filter)
// ===============================
const getClaims = async (req, res) => {
  try {
    const search = req.query.search || "";
    const status = req.query.status || "";
    const page = Number(req.query.page) || 1;
    const limit = 5;

    const where = {
      AND: [
        status ? { status } : {},
        {
          OR: [
            {
              reason: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              status: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      ],
    };

    const claims = await prisma.claim.findMany({
      where,
      include: {
        policy: true,
      },
      orderBy: {
        id: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.claim.count({
      where,
    });

    res.json({
      claims,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// Create Claim
// ===============================
const createClaim = async (req, res) => {

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
      message: "Failed to Create Claim",
    });

  }

};

// ===============================
// Update Claim
// ===============================
const updateClaim = async (req, res) => {

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
const deleteClaim = async (req, res) => {

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

module.exports = {
  getClaims,
  createClaim,
  updateClaim,
  deleteClaim,
};