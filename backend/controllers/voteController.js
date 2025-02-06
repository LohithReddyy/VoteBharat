
import Party from "../models/party.js";
import User from "../models/User.js";

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
  const { aadharNumber } = req.body;

  try {
    const user = await User.findOne({ aadharNumber });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.hasVoted) {
      return res.status(400).json({ message: "You have already voted!" });
    }

    const party = await Party.findOne({ partyId });
    if (!party) return res.status(404).json({ message: "Party not found" });

    party.voteCount += 1;
    await party.save();

    user.hasVoted = true;
    await user.save();

    res.status(200).json({ message: "Vote submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error processing vote", error });
  }
};
