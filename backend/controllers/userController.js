const User = require("../models/User");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err.message });
  }
};

// Get user by UserId
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ UserId: req.params.userid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user", error: err.message });
  }
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const newUser = new User({
      UserId: req.body.UserId,
      UserName: req.body.UserName,
      Password: req.body.Password,
      Email: req.body.Email,
      Mobile: req.body.Mobile
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Registration Error:", err.message); // ✅ See error in terminal
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

