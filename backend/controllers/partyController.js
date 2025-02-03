import Party from "../models/party.js";
import fs from "fs";

// Add Party (Admin Only)
export const addParty = async (req, res) => {
    try {
        const { partyId, name, manifesto } = req.body;
        const symbol = req.file ? req.file.path : "";

        const party = new Party({ partyId, name, symbol, manifesto });
        await party.save();
        res.status(201).json({ message: "Party added successfully", party });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Parties 
export const getParties = async (req, res) => {
    try {
        const parties = await Party.find();
        res.status(200).json(parties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Party (Admin Only)
export const deleteParty = async (req, res) => {
    try {
        const { id } = req.params;
        const party = await Party.findById(id);

        if (!party) return res.status(404).json({ message: "Party not found" });

        if (party.symbol) fs.unlinkSync(party.symbol);

        await party.deleteOne();
        res.status(200).json({ message: "Party deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
