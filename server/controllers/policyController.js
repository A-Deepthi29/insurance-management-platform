const prisma = require("../config/prisma");

// ==============================
// Create Policy
// ==============================
const createPolicy = async (req, res) => {
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

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==============================
// Get Policies (Search + Filter)
// ==============================
const getPolicies = async (req, res) => {

  try {

    const search = req.query.search || "";
    const status = req.query.status || "";

    const policies = await prisma.policy.findMany({

      where: {

        AND: [

          status ? { status } : {},

          {

            OR: [

              {

                policyNumber: {
                  contains: search,
                  mode: "insensitive",
                },

              },

              {

                policyType: {
                  contains: search,
                  mode: "insensitive",
                },

              },

            ],

          },

        ],

      },

      include: {
        customer: true,
      },

      orderBy: {
        id: "desc",
      },

    });

    res.json(policies);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ==============================
// Update Policy
// ==============================
const updatePolicy = async (req, res) => {

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

    const policy = await prisma.policy.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!policy) {
      return res.status(404).json({
        message: "Policy Not Found",
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

    res.json({
      message: "Policy Updated Successfully",
      policy: updatedPolicy,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ==============================
// Delete Policy
// ==============================
const deletePolicy = async (req, res) => {

  try {

    const { id } = req.params;

    const policy = await prisma.policy.findUnique({

      where: {
        id: Number(id),
      },

    });

    if (!policy) {

      return res.status(404).json({
        message: "Policy Not Found",
      });

    }

    await prisma.policy.delete({

      where: {
        id: Number(id),
      },

    });

    res.json({
      message: "Policy Deleted Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  createPolicy,
  getPolicies,
  updatePolicy,
  deletePolicy,
};