const prisma = require("../config/prisma");

// ==============================
// CREATE POLICY
// ==============================
exports.createPolicy = async (req, res) => {
  try {
    const {
      customerId,
      policyType,
      policyNumber,
      premiumAmount,
      startDate,
      endDate,
      status,
    } = req.body;

    // Validate required fields
    if (
      !customerId ||
      !policyType ||
      !policyNumber ||
      !premiumAmount ||
      !startDate ||
      !endDate ||
      !status
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check customer exists
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(customerId),
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Check duplicate policy number
    const existingPolicy = await prisma.policy.findUnique({
      where: {
        policyNumber,
      },
    });

    if (existingPolicy) {
      return res.status(400).json({
        message: "Policy Number already exists",
      });
    }

    // Create policy
    const policy = await prisma.policy.create({
      data: {
        customerId: Number(customerId),
        policyType,
        policyNumber,
        premiumAmount: Number(premiumAmount),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
      },
    });

    res.status(201).json({
      message: "Policy Created Successfully",
      policy,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// GET ALL POLICIES
// ==============================
exports.getPolicies = async (req, res) => {
  try {
    const policies = await prisma.policy.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json(policies);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// GET SINGLE POLICY
// ==============================
exports.getPolicyById = async (req, res) => {
  try {
    const { id } = req.params;

    const policy = await prisma.policy.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        customer: true,
      },
    });

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    res.status(200).json(policy);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// UPDATE POLICY
// ==============================
exports.updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      customerId,
      policyType,
      policyNumber,
      premiumAmount,
      startDate,
      endDate,
      status,
    } = req.body;

    // Check policy exists
    const existingPolicy = await prisma.policy.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingPolicy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    // Check customer exists
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(customerId),
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const updatedPolicy = await prisma.policy.update({
      where: {
        id: Number(id),
      },
      data: {
        customerId: Number(customerId),
        policyType,
        policyNumber,
        premiumAmount: Number(premiumAmount),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
      },
    });

    res.status(200).json({
      message: "Policy Updated Successfully",
      policy: updatedPolicy,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// DELETE POLICY
// ==============================
exports.deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPolicy = await prisma.policy.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingPolicy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    await prisma.policy.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Policy Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};