const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET: Fetch all users
router.get("/", userController.getAllUsers);

// GET: Fetch a single user by UserId
router.get("/:userid", userController.getUserById);

// POST: Register a new user
router.post("/register", userController.registerUser);

module.exports = router;