import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ======================================================
// ADMIN LOGIN
// POST /api/admin/login
// ======================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});


// ======================================================
// VERIFY ADMIN
// GET /api/admin/me
// ======================================================

router.get("/me", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin API is running",
  });
});


export default router;