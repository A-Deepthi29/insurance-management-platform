const prisma = require("../config/prisma");

// ==============================
// Add Customer
// ==============================
const addCustomer = async (req, res) => {
  try {
    const { name, dob, phone, address, email } = req.body;

    if (!name || !dob || !phone || !address || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingCustomer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (existingCustomer) {
      return res.status(400).json({
        message: "Customer with this email already exists",
      });
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        dob: new Date(dob),
        phone,
        address,
        email,
      },
    });

    res.status(201).json({
      message: "Customer Added Successfully",
      customer,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==============================
// Get Customers (Search + Pagination)
// ==============================
const getCustomers = async (req, res) => {
  try {

    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = 5;

    const where = {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search,
          },
        },
      ],
    };

    const customers = await prisma.customer.findMany({
      where,

      skip: (page - 1) * limit,

      take: limit,

      orderBy: {
        id: "desc",
      },
    });

    const total = await prisma.customer.count({
      where,
    });

    res.json({
      customers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalCustomers: total,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==============================
// Update Customer
// ==============================
const updateCustomer = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      dob,
      phone,
      address,
      email,
    } = req.body;

    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer Not Found",
      });
    }

    const updatedCustomer = await prisma.customer.update({

      where: {
        id: Number(id),
      },

      data: {
        name,
        dob: new Date(dob),
        phone,
        address,
        email,
      },

    });

    res.json({
      message: "Customer Updated Successfully",
      customer: updatedCustomer,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==============================
// Delete Customer
// ==============================
const deleteCustomer = async (req, res) => {

  try {

    const { id } = req.params;

    const customer = await prisma.customer.findUnique({

      where: {
        id: Number(id),
      },

    });

    if (!customer) {

      return res.status(404).json({
        message: "Customer Not Found",
      });

    }

    await prisma.customer.delete({

      where: {
        id: Number(id),
      },

    });

    res.json({
      message: "Customer Deleted Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ==============================
// Exports
// ==============================
module.exports = {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};