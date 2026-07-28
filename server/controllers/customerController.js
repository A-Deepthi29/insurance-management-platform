const prisma = require("../config/prisma");

exports.addCustomer = async (req, res) => {
  try {
    const { name, dob, phone, address, email } = req.body;

    // Validate required fields
    if (!name || !dob || !phone || !address || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if customer already exists
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

    // Create customer
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
      message: "Customer added successfully",
      customer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dob, phone, address, email } = req.body;

    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
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

    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};