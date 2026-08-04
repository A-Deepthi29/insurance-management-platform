const prisma = require("../config/prisma");

// Get Dashboard Report
const getReport = async (req, res) => {
  try {
    const customers = await prisma.customer.count();
    const policies = await prisma.policy.count();
    const claims = await prisma.claim.count();
    const premiums = await prisma.premiumPayment.count();

    res.status(200).json({
      customers,
      policies,
      claims,
      premiums,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch report",
    });
  }
};

module.exports = {
  getReport,
};