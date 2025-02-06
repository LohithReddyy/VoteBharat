import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Party from "../models/party.js";

// Fetch all users 
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

//update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, aadharNumber, role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

  const updatedUser = { name, email, aadharNumber, role, _id: id };

  await User.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
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

//Admin Dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    const parties = await Party.find({}, "-__v"); 

    res.status(200).json({ users, parties });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin dashboard data", error });
  }
};
