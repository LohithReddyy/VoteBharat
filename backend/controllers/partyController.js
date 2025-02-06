import Party from "../models/party.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Add Party (Admin Only)
export const addParty = async (req, res) => {
    try {
        const {  name, manifesto } = req.body;
        const symbol = req.file ? req.file.path : "";

        const party = new Party({  name, symbol, manifesto });
        await party.save();
        res.status(201).json({ message: "Party added successfully", party });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const updateParty = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, manifesto } = req.body;
      const symbol = req.file ? req.file.path : null;
  
      // Check if at least one field is provided for update
      if (!name && !manifesto && !symbol) {
        return res.status(400).json({ message: "Provide at least one field to update" });
      }
  
      const updateFields = {};
      if (name) updateFields.name = name;
      if (manifesto) updateFields.manifesto = manifesto;
      if (symbol) updateFields.symbol = symbol;
  
      const updatedParty = await Party.findByIdAndUpdate(id, updateFields, { new: true });
  
      if (!updatedParty) {
        return res.status(404).json({ message: "Party not found" });
      }
  
      res.json({ message: "Party updated successfully", party: updatedParty });
    } catch (error) {
      console.error("Error updating party:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  // Delete Party and its Image
  export const deleteParty = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the party by ID
      const party = await Party.findById(id);
  
      if (!party) {
        return res.status(404).json({ message: "Party not found" });
      }
  
      // Construct the image path
      const imagePath = path.join("uploads/", party.symbol);  
      // Check if the image exists and delete it
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      // Delete the party from the database
      await Party.findByIdAndDelete(id);
  
      res.json({ message: "Party and associated image deleted successfully" });
    } catch (error) {
      console.error("Error deleting party:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  