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


