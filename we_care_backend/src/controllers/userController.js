const userModel = require("../models/userModel");
const { EncodeToken } = require("../utility/tokenHelper");

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });

    const existing = await userModel.findOne({ email });
    if (existing)
      return res.status(400).json({ success: false, message: "Email already exists" });

    const user = await userModel.create({ email, password, role });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed", error: error.toString() });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: "Email not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Password incorrect" });

    const token = EncodeToken(user.email, user._id, user.role);

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed", error: error.toString() });
  }
};

// LOGOUT USER
exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Logout failed", error: error.toString() });
  }
};

// GET USER BY ID (requires auth middleware to set req.user)
exports.user = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, result: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetching user failed", error: error.toString() });
  }
};

// UPDATE USER
exports.update = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const userId = req.user._id;

    const updatedData = { email, role };

    if (password) {
      const bcrypt = require("bcrypt");
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const user = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });

    res.status(200).json({
      success: true,
      message: "User data updated",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error: error.toString() });
  }
};