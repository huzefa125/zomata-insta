// controllers/authController.js

const userModel = require("../models/user.models");
const foodPartnerModel = require("../models/foodpartner.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================== REGISTER USER ==================
async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { _id: user._id, email: user.email, fullName: user.fullName },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ================== LOGIN USER ==================
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: { _id: user._id, email: user.email, fullName: user.fullName },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ================== LOGOUT ==================
async function logoutUser(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Unable to logout" });
  }
}

// ================== REGISTER FOOD PARTNER ==================
async function registerFoodPartner(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingPartner = await foodPartnerModel.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Food Partner registered successfully",
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    console.error("Food Partner Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ================== LOGIN FOOD PARTNER ==================
async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Food Partner logged in successfully",
      foodPartner: {
        _id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    console.error("Food Partner Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function LogoutFoodPartner(req,res){
  try {
    req.cookies.clear("token")
    res.status(200).json({message:"Food partner logged out successfully"})
  } catch (error) {
    res.status(500).json({message:"Unable to logout"})
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  LogoutFoodPartner
};
