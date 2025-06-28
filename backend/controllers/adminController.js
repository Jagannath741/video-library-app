const Admin = require("../models/Admin");

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving admins", error: err.message });
  }
};

// Admin login
exports.adminLogin = async (req, res) => {
  const { UserId, Password } = req.body;

  try {
    const admin = await Admin.findOne({ UserId });
    if (!admin) {
      return res.status(401).json({ message: "Invalid UserId" });
    }

    if (admin.Password !== Password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    res.json({ message: "Login successful", admin });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
