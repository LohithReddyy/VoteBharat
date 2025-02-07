
import Party from "../models/party.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Get all parties
export const getAllParties = async (req, res) => {
  try {
    const parties = await Party.find();
    res.status(200).json(parties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parties", error });
  }
};

// Vote for a party




export const voteForParty = async (req, res) => {
  try {
    const { aadharNumber, partyId } = req.body;

    console.log("Received Vote Request:", { aadharNumber, partyId });

    
    const trimmedPartyId = partyId?.trim(); 
    if (!mongoose.Types.ObjectId.isValid(trimmedPartyId)) {
      console.log("Invalid party ID detected:", trimmedPartyId);
      return res.status(400).json({ message: "Invalid party ID format" });
    }

    
    const user = await User.findOne({ aadharNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User Found:", user);

    
    if (user.hasVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    
    const party = await Party.findById(trimmedPartyId);
    if (!party) {
      console.log("Party Not Found with ID:", trimmedPartyId);
      return res.status(404).json({ message: "Party not found" });
    }

    console.log("Party Found:", party);

   
    party.voteCount += 1;
    await party.save();

    console.log("Updated Party Votes:", party.voteCount);

    
    user.hasVoted = true;
    await user.save();

    console.log("User Voting Status Updated:", user.hasVoted);

    return res.status(200).json({ message: "Vote cast successfully", party });
  } catch (error) {
    console.error("Error processing vote:", error);
    return res.status(500).json({ message: "Error processing vote", error: error.message || error });
  }
};
