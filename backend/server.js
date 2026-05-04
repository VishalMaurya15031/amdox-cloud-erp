import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "amdox_super_secret_key_2026";

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get("/", (req, res) => {
  res.send("Amdox ERP Backend API is running!");
});

// --- AUTHENTICATION ROUTES ---

// 1. Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "Employee",
      },
    });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// 2. Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// --- EMPLOYEE ROUTES (HR MODULE) ---

// Get all employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees" });
  }
});

// Add a new employee
app.post("/api/employees", async (req, res) => {
  try {
    const { name, email, department, role, status } = req.body;
    
    // Auto-generate empId like EMP-001
    const count = await prisma.employee.count();
    const empId = `EMP-${String(count + 1).padStart(3, '0')}`;

    const newEmployee = await prisma.employee.create({
      data: { empId, name, email, department, role, status: status || "Active" }
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding employee" });
  }
});

// --- INVENTORY ROUTES (AI MODULE 2) ---

// Get all inventory items
app.get("/api/inventory", async (req, res) => {
  try {
    const items = await prisma.inventoryItem.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching inventory" });
  }
});

// Add new inventory item
app.post("/api/inventory", async (req, res) => {
  try {
    const { sku, name, category, quantity, price, aiAlert } = req.body;
    
    // Determine status based on quantity
    let status = "In Stock";
    if (quantity <= 0) status = "Out of Stock";
    else if (quantity < 10) status = "Low Stock";

    const newItem = await prisma.inventoryItem.create({
      data: { 
        sku, 
        name, 
        category, 
        quantity: parseInt(quantity), 
        price: parseFloat(price), 
        status,
        aiAlert 
      }
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding inventory item" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});