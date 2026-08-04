const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(400).json({
            message: "Email already registered",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    });

    res.status(201).json({
        message: "User Registered Successfully",
        user,
    });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);

        res.status(200).json({
            message: "Login Successful",
            token,
            role: user.role,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};