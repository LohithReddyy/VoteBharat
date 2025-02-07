import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Party from "../models/party.js";
import bcrypt from "bcryptjs";
// Fetch all users 
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};



// Admin Login
export const adminLogin = async (req, res) => {
  const { aadharNumber, password } = req.body;

  if (aadharNumber ===  process.env.AADHARNUM && password === process.env.PASSWORD) {
    try {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({ message: "Admin login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Token generation failed", error });
    }
  } else {
    res.status(401).json({ message: "Invalid admin credentials" });
  }
};

//Dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const partyCount = await Party.countDocuments();

    res.status(200).json({ userCount, partyCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin dashboard data", error });
  }
};


//Count Votes
export const getVotes = async (req, res) => {
  try {
  const parties = await Party.find({}, "name symbol voteCount");

    res.status(200).json({ voteResults: parties });
  } catch (error) {
    res.status(500).json({ message: "Error fetching vote counts", error });
  }
};





// Add User
export const addUser = async (req, res) => {
  try {
    const { name, aadharNumber, age, gender, password } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      aadharNumber,
      age,
      gender,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, aadharNumber, age, gender, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    user.name = name || user.name;
    user.aadharNumber = aadharNumber || user.aadharNumber;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.password = hashedPassword;

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
