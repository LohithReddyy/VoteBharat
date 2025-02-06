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


//Update Party (Admin Only)
export const updateParty = async (req, res) => {
    try {
        const { id } = req.params; // This will be `partyId`
        const { name, manifesto } = req.body;
        const symbol = req.file ? req.file.path : null;

        // Find the party by `partyId` instead of MongoDB `_id`
        const party = await Party.findOne({ partyId: id });

        if (!party) return res.status(404).json({ message: "Party not found" });

        // Only update fields that are provided
        if (name) party.name = name;
        if (manifesto) party.manifesto = manifesto;
        if (symbol) {
            if (party.symbol) fs.unlinkSync(party.symbol);
            party.symbol = symbol;
        }

        await party.save();
        res.status(200).json({ message: "Party updated successfully", party });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get Party By ID
export const getPartyById = async (req, res) => {
    try {
        const { id } = req.params;
        const party = await Party.findById(id);
        if (!party) return res.status(404).json({ message: "Party not found" });
        res.status(200).json(party);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
