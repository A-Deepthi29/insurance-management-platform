const prisma = require("../config/prisma");

// =============================
// Create Premium Payment
// =============================
const createPremium = async (req, res) => {
  try {
    const {
      policyId,
      paymentDate,
      amount,
      paymentStatus,
    } = req.body;

    // Check policy exists
    const policy = await prisma.policy.findUnique({
      where: {
        id: Number(policyId),
      },
    });

    if (!policy) {
      return res.status(404).json({
        message: "Policy not found",
      });
    }

    const premium = await prisma.premiumPayment.create({
      data: {
        policyId: Number(policyId),
        paymentDate: new Date(paymentDate),
        amount: Number(amount),
        paymentStatus,
      },
    });

    res.status(201).json({
      message: "Premium Payment Added Successfully",
      premium,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =============================
// Get All Premium Payments
// =============================
const getPremiums = async (req, res) => {
  try {
    const premiums = await prisma.premiumPayment.findMany({
      include: {
        policy: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(premiums);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =============================
// Get Single Premium
// =============================
const getPremiumById = async (req, res) => {
  try {
    const premium = await prisma.premiumPayment.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        policy: true,
      },
    });

    if (!premium) {
      return res.status(404).json({
        message: "Premium Payment not found",
      });
    }

    res.json(premium);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =============================
// Update Premium
// =============================
const updatePremium = async (req, res) => {
  try {
    const {
      policyId,
      paymentDate,
      amount,
      paymentStatus,
    } = req.body;

    const premium = await prisma.premiumPayment.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!premium) {
      return res.status(404).json({
        message: "Premium Payment not found",
      });
    }

    const updated = await prisma.premiumPayment.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        policyId: Number(policyId),
        paymentDate: new Date(paymentDate),
        amount: Number(amount),
        paymentStatus,
      },
    });

    res.json({
      message: "Premium Updated Successfully",
      updated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =============================
// Delete Premium
// =============================
const deletePremium = async (req, res) => {
  try {
    const premium = await prisma.premiumPayment.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!premium) {
      return res.status(404).json({
        message: "Premium Payment not found",
      });
    }

    await prisma.premiumPayment.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Premium Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.updatePayment = async (req, res) => {

  const { id } = req.params;

  const payment = await prisma.premiumPayment.update({

    where: {
      id: Number(id),
    },

    data: req.body,

  });

  res.json({
    message: "Payment Updated Successfully",
    payment,
  });

};

module.exports = {
  createPremium,
  getPremiums,
  getPremiumById,
  updatePremium,
  deletePremium,
};